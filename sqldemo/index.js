const mysql = require("mysql")
// 创建对象
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"528478huaHUA",
    port:"3306",
    database:"myblog"
})
// 开始连接
con.connect()
// 执行sql 语句
const sql = "select * from users;"
con.query(sql,(err,result) => {
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})
con.end()