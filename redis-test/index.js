const redis = require("redis")

// 创建客户端
const redisClient = redis.createClient(
    {
        socket:{
            host:"127.0.0.1",
            port:6379
        }
    }
)

redisClient.on("error",err => {
    console.log("error" + err)
})

// 测试
redisClient.set("myname","zhangsan",redis.print)


redisClient.get("myname",(err,val) => {
    if(err){
        console.error(err)
        return
    }
    
    console.log(val)
    redisClient.quit()
})