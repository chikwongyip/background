const { getList,getDetail,newBlog,updateBlog,deleteBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")


const handleBlogRouter = (req, res) => {
    const method = req.method; //GET or POST
    const path = req.url.split("?")[0]
    const id = req.query.id || ""
    //获取blog 列表
    if(method === "GET" && path === "/api/blog/list"){
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }

    //获取blog详情
    if(method === "GET" && path === "/api/blog/detail"){
        const blogDetail = getDetail(id)
        return new SuccessModel(blogDetail)
    }

    if(method === "POST" && path === "/api/blog/new"){
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
    }

    if(method === "POST" && path === "/api/blog/update"){
        const result = updateBlog(id,req.body)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel("更新失败")
        }
    }

    if(method === "POST" && path === "/api/blog/del"){
       const result = deleteBlog(id)
       if(result){
        return new SuccessModel()
       }else{
        return new ErrorModel("删除失败")
       }
    }

} 

module.exports = handleBlogRouter;