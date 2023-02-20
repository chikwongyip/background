const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis")
//获取cookie过期时间

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    if(method === "POST" && path === "/api/user/login"){
        const{ username,password } = req.body
        const result = login(username,password)
        return result.then((userData) => {
            if(userData.username){
                req.session.username = userData.username
                req.session.realname = userData.realname
                set(req.sessionId,req.session)
                // console.log("request session is",req.session)
                return new SuccessModel(userData)
            }
            return new ErrorModel("登陆失败")
        })
    }
}
module.exports = handleUserRouter;