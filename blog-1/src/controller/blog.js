const { exec } = require("../db/mysql")   
const xss = require("xss")
const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1`
    if(author){
        sql += ` and author = '${author}'`
    }
    if(keyword){
        sql += ` and title like '%${keyword}%'`
    }
    // 先返回假数据，（格式是正确的）
    return exec(sql)
}
const getDetail = (id) => {
    if(id){
        let sql = `select * from blogs where id = '${id}'`
        return exec(sql).then(rows => {
            return rows[0]
        })
    }
}
const newBlog = (blogData = {}) => {
    // blogData 包含属性可能有title 内容 author
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    const sql = `
        insert into blogs 
            (title,content,createtime,author)
        values
            ('${title}','${content}','${createtime}','${author}')
    `
    return exec(sql).then(insertData => {
        // console.log(insertData)
        return {
            id:insertData.insertId
        }
    })
}

const updateBlog = (id,blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    let sql = `update blogs set content = '${content}',
                                title = '${title}'
                            where id = ${id}`
    // UPDATE `myblog`.`blogs` SET `title` = 'title2', `content` = 'content3', `author` = 'wyman1' WHERE (`id` = '3');
    // id 就是blog更新的id
    // blogData 包含属性可能有title 内容 时间
    return exec(sql).then(updateData => {
        // console.log(updateData)
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}

const deleteBlog = (id,author) => {
    // 根据id 删除blog
    const sql = `delete from blogs where id='${id}' and author = '${author}'`
    return exec(sql).then(deleteLog => {
        if(deleteLog.affectedRows > 0){
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}