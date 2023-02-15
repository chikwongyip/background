const env = process.env.NODE_ENV //环境参数

let MYSQL_CONF
if(env === "dev"){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"528478huaHUA",
        port:"3306",
        database:"myblog"
    }
}

if(env === "production"){
    MYSQL_CONF = {
        host:"127.0.0.1",
        user:"root",
        password:"528478huaHUA",
        port:"3306",
        database:"myblog"
    }
}

module.exports = {
    MYSQL_CONF
}