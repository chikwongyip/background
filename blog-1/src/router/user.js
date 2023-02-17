const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
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
                console.log("request session is",req.session)
                return new SuccessModel(userData)
            }
            return new ErrorModel("登陆失败")
        })
    }

    //登录验证的测试
    if(method === "GET" && req.path === "/api/user/login-test"){
        console.log(req.session.username)
        if(req.session.username){
            console.log(req.session.username)
            return Promise.resolve(
                new SuccessModel()
                )
        }
        return Promise.resolve(
            new ErrorModel("尚未登录")
            )
    }

}
module.exports = handleUserRouter;