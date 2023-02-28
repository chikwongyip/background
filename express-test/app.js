const express = require("express");

const app = express();

app.use((req,res,next) => {
    console.log("请求开始...",req.method,req.url);
    next();
})

app.use((req,res,next) => {
    req.cookies = {
        userID : "123"
    }
})

app.use((req,res,next) => {
    setTimeout(() => {
       req.body = {
        a:100,
        b:200
       } 
    }, );
    next();
})

app.use("/api",(req,res,next) =>{
    console.log("处理api")
    next()
})

app.get("/api",(req,res,next) =>{
    console.log("处理api")
    next()
})

app.post("/api",(req,res,next) =>{
    console.log("处理api")
    next()
})

app.get("/api/get-cookie",(req,res,next) => {
    console("处理cookie")
    res.json( 
        {
            errno:0,
            data:req.cookies
        }
    )
})

app.get("/api/get-post-data",(req,res,next) => {
    console("处理post data")
    res.json( 
        {
            errno:0,
            data:req.body
        }
    )
})

app.use((req,res,next) => {
    console.log("处理404")
    res.json(
        {
            errno:-1,
            message:"404 not found"

        }
    )
})

app.listen(3000,() => {
    console.log("port 3000 listen")
})