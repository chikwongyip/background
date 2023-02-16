const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    if(method === "POST" && path === "/api/user/login"){
        const{ username,password } = req.body
        const result = login(username,password)
        return result.then((userData) => {
            if(userData.username){
                res.setHeader("Set-Cookie",`username=${userData.username}; path=/`)
                return new SuccessModel(userData)
            }
            return new ErrorModel("登陆失败")
        })
    }

    //登录验证的测试
    if(method === "GET" && req.path === "/api/user/login-test"){
        console.log(req.cookie)
        if(req.cookie.username){
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel("尚未登录"))
    }

}
module.exports = handleUserRouter;