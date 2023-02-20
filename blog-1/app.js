const { resolve } = require("path")
const querystring = require("querystring")
const { get, set } = require("./src/db/redis")
const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
// //session 数据
// const SESSION_DATA ={}
//获取post data
const getPostData = (req) => {
    const promise = new Promise((resolve,reject) => {
        // 如果请求方法不是post 则返回
        if(req.method !== "POST"){
            resolve({})
            return
        }
        // 如果请求报文不是JSON 格式则返回
        if(req.headers["content-type"] !== "application/json"){
            resolve({})
            return
        }
        let postData = ""
        req.on("data", chunk => {
            postData += chunk.toString()
        })
        req.on("end",() => {
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader("Content-type","application/json")
    // 获取url
    const url = req.url
    //获取path
    req.path = url.split("?")[0]
    // 解析query
    req.query = querystring.parse(url.split("?")[1])
    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ""
    cookieStr.split(";").forEach(element => {
        if(!element){
            return
        }
        const arr = element.split("=")
        const key = arr[0].trim() //去掉空格
        const val = arr[1].trim()
        req.cookie[key] = val
    });
    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userId
    // 如果cookie里面拿不到userId
    if(!userId){
        // 生成一个新的session id
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //把session id 设置到redis 数据库中
        set("userid",{})
    }
    // 获取session
    req.sessionId = userId
    get(req.sessionId).then( sessionData => {
        if(sessionData == null){
            // 初始化redis 中的session值
            set(req.sessionId,{})
            // 设置session
            req.session = {}
        }else{
            req.session = sessionData
            console.log("req.session:",req.session)
        }
        return getPostData(req)
    }).then( postData => {
         // 处理post data
            req.body = postData
            const blogResult = handleBlogRouter(req,res)
            if(blogResult){
                blogResult.then(blogData => {
                    if(needSetCookie){
                        res.setHeader("Set-Cookie",`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(
                        JSON.stringify(blogData)
                    )
                })
                return
            }
            // 处理user 路由
            const loginData = handleUserRouter(req,res)
            if(loginData){
                loginData.then(userData =>{
                    if(needSetCookie){
                        res.setHeader("Set-Cookie",`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(
                        JSON.stringify(userData)
                    )
                })
                return
            } 
            // 未命中 返回 404
            res.writeHead(404,{"content-type":"text/plain"})
            res.write("404 Not Found\n")
            res.end()     
    })
    
}
module.exports = serverHandle;