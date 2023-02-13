const { getList } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET or POST
    const path = req.url.split("?")[0]
    //获取blog 列表
    if(method === "GET" && path === "/api/blog/list"){
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }

    //获取blog详情
    if(method === "GET" && path === "/api/blog/detail"){
        return{
            msg:"这是获取blog的详情接口"
        }
    }

    if(method === "POST" && path === "api/blog/new"){
        return{
            msg:"新增blog"
        }
    }

    if(method === "POST" && path === "api/blog/update"){
        return{
            msg:"更新"
        }
    }

    if(method === "POST" && path === "api/blog/del"){
        return{
            msg:"删除"
        }
    }

} 

module.exports = handleBlogRouter;