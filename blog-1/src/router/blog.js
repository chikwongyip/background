const { getList,
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog } = require("../controller/blog")
        
const { SuccessModel, 
        ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET or POST
    const path = req.url.split("?")[0]
    const id = req.query.id || ""
    const author = req.query.author || ""
    //获取blog 列表
    if(method === "GET" && path === "/api/blog/list"){
        const keyword = req.query.keyword || ""
        const result = getList(author,keyword)
        return  result.then(listData => {
                    return new SuccessModel(listData)
                })
    }
    //获取blog详情
    if(method === "GET" && path === "/api/blog/detail"){
        const result = getDetail(id)
        return result.then( blogDetail => {
            return new SuccessModel(blogDetail)
        })
    }

    if(method === "POST" && path === "/api/blog/new"){
        // 先使用假数据 zhangsan
        req.body.author = "zhangsan"
        const result = newBlog(req.body)
        return result.then( data => {
            return new SuccessModel(data)
        })
    }

    if(method === "POST" && path === "/api/blog/update"){
        const result = updateBlog(id,req.body)
        return result.then(success => {
            if(success){
                return new SuccessModel("更新成功")
            }
            return new ErrorModel("更新失败")
        })
    }

    if(method === "POST" && path === "/api/blog/del"){

       const result = deleteBlog(id,author)
       return result.then(success => {
            if(success){
                return new SuccessModel("删除成功")
            }
            return new ErrorModel("删除失败")
       })
    }

} 

module.exports = handleBlogRouter;