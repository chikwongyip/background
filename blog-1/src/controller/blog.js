const getList = (author,keyword) => {
    // 先返回假数据，（格式是正确的）
    return [
        {
            id:1,
            title:"标题",
            content:"dasdas123asd1312312312",
            createTime:1676271581651,
            author:"zhangsan"
        },
        {
            id:2,
            title:"标题2",
            content:"das3123asddas123asd1312312312",
            createTime:1676271625415,
            author:"lisi"
        }
    ]
}
const getDetail = (id) => {
    return [
        {
            id:1,
            content:"this is content"
        },
        {
            id:2,
            content:"this is content2"
        }
    ]
}
const newBlog = (blogData = {}) => {
    // blogData 包含属性可能有title 内容 时间
    return{
        id:3 // 执行完毕返回insert 的blog id
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog
}