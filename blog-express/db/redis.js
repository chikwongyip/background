const redis = require("redis")
const { REDIS_CONF } = require("../conf/db")

// 创建客户端
const redisClient = redis.createClient(
    {
        socket:REDIS_CONF
    }
)

redisClient.on("error",err => {
    console.log("error" + err)
})

module.exports = redisClient
