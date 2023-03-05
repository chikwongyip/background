var express = require('express');
var router = express.Router();
const { getList,
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog 
      } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck")
router.get('/list',(req, res, next) => {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";
  if(req.session.username == null){
    res.json(
      new ErrorModel("未登录")
    )
    return
  }

  const result = getList(author,keyword);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
      )
  })
});

router.get("/detail",(req,res,next) => {
  const id = req.query.id;
  const result = getDetail(id)
  return result.then( blogDetail => {
    res.json(
      new SuccessModel(blogDetail)
    )
  })
});

router.post("/new",loginCheck,(req,res,next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then( data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post("/update",loginCheck, (req,res,next) => {
  const id = req.query.id
  const result = updateBlog(id,req.body)
  return result.then(success => {
      if(success){
        res.json(
          new SuccessModel("更新成功")
        )
      }
      res.json(
        new ErrorModel("更新失败")
      )
  })
})

router.post("/del",loginCheck,(req,res,next) => {
  const id = req.body.id
  const result = deleteBlog(id,req.session.username)
  return result.then(success => {
       if(success){
          res.json(
            new SuccessModel("删除成功")
          )
       }else{
          res.json(
            new ErrorModel("删除失败")
          )
       }
  })
})
module.exports = router; 