const { resolve } = require("path")
const querystring = require("querystring")
const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
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
    //console.log(cookieStr)
    cookieStr.split(";").forEach(element => {
        if(!element){
            return
        }
        const arr = element.split("=")
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    });
    console.log(req.cookie)
    // 处理post data
    getPostData(req).then( postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData => {
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