const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    if(method === "POST" && path === "/api/user/login"){
        const{ username,password } = req.body
        const result = loginCheck(username,password)
        return result.then((userData) => {
            if(userData.username){
                return new SuccessModel(userData)
            }
            return new ErrorModel("登陆失败")
        })
         
    }
}
module.exports = handleUserRouter;