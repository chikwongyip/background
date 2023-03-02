const env = process.env.NODE_ENV //环境参数
let REDUIS_CONF
let MYSQL_CONF
if(env === "dev"){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"528478huaHUA",
        port:"3306",
        database:"myblog"
    }

    REDUIS_CONF = {
        port:6379,
        host:"127.0.01"
    }
}
if(env === "mac"){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"528478huaHUA@",
        port:"3306",
        database:"myblog"
    }

    REDUIS_CONF = {
        port:6379,
        host:"127.0.01"
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
    
    REDUIS_CONF = {
        port:6379,
        host:"127.0.01"
    }
}

module.exports = {
    MYSQL_CONF,
    REDUIS_CONF
}