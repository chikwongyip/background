var express = require('express');
var router = express.Router();
const { getList,
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog 
      } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
router.get('/list', function(req, res, next) {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";
  if(req.query.isadmin){
    if(req.session.username == null){
      res.json(
        new ErrorModel("未登录")
      )
      return
    }
  }
  const result = getList(author,keyword);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
      )
  })
});

module.exports = router; 