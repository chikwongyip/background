const { resolve } = require("path")
const querystring = require("querystring")
const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")

const getPostData = (req) => {
    const promise = new Promise((resolve,reject) => {
        if(req.method !== "POST"){
            resolve({})
            return
        }
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
    // 获取path
    const url = req.url
    req.path = url.split("?")[0]
    // 解析query
    req.query = querystring.parse(url.split("?")[0])
    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData
        const blogData = handleBlogRouter(req, res)
        // 处理blog路由
        if(blogData){
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        // 处理user 路由
        const loginData = handleUserRouter(req,res)
        if(loginData){
            res.end(
                JSON.stringify(loginData)
            )
            return
        } 
        // 未命中 返回 404
        res.writeHead(404,{"content-type":"text/plain"})
        res.write("404 Not Found\n")
        res.end()     
    })
    
}
module.exports = serverHandle;