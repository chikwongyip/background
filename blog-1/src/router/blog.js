const { getList,
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog } = require("../controller/blog")
        
const { SuccessModel, 
        ErrorModel } = require("../model/resModel")

const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel("尚未登录")
        )
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method; //GET or POST
    const path = req.url.split("?")[0]
    const id = req.query.id || ""
    const author = req.query.author || ""
    //获取blog 列表
    if(method === "GET" && path === "/api/blog/list"){
        const keyword = req.query.keyword || ""
        let author = req.query.author || ""
        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                return loginCheckResult
            }
            author = req.session.username
        }

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
    // 新增blog
    if(method === "POST" && path === "/api/blog/new"){
        // 检测是否有登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then( data => {
            return new SuccessModel(data)
        })
    }

    if(method === "POST" && path === "/api/blog/update"){
        // 检测是否有登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        const result = updateBlog(id,req.body)
        return result.then(success => {
            if(success){
                return new SuccessModel("更新成功")
            }
            return new ErrorModel("更新失败")
        })
    }

    if(method === "POST" && path === "/api/blog/del"){
        // 检测是否有登录
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
       const result = deleteBlog(id,req.session.username)
       return result.then(success => {
            if(success){
                return new SuccessModel("删除成功")
            }
            return new ErrorModel("删除失败")
       })
    }

} 

module.exports = handleBlogRouter;