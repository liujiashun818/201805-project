let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();
app.use(bodyParser.json());
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
  res.header('Access-Control-Allow-Headers','Content-Type,Accept');
  res.header('Access-Control-Allow-Credentials','true');
  next();
});
app.use(session({
    resave:true,
    secret:'zfpx',
    saveUninitialized:true
}));
app.listen(3000);
let sliders = require('./mock/sliders');
app.get('/getSliders',function(req,res){
    res.json(sliders);
});
let lessons = require('./mock/lessons');
// http://getLessons/vue?offset=0&limit=5
app.get('/getLessons/:category',function(req,res){
   let category = req.params.category;
   let {offset,limit} = req.query;
   offset = isNaN(offset)?0:parseInt(offset);//偏移量 
   limit = isNaN(limit)?5:parseInt(limit); //每页条数
   let list = JSON.parse(JSON.stringify(lessons));
   if(category!='all'){
     list = list.filter(item=>item.category==category);
   }
   let total = list.length;
   //分页数据
   list = list.slice(offset,offset+limit);
   //list.forEach(item=>item.title= item.title+Math.random());
   setTimeout(function(){
    res.json({
        list,
        hasMore:total>offset+limit
    });
   },1000);
});
// 30 6次 5条 30 offset=30 
let users = [];
app.post('/reg',function(req,res){
   let body = req.body;
   users.push(body);
   res.json({
       success:'注册成功'
   })
});
//user username password
app.post('/login',function(req,res){
    let body = req.body;//{username,password}
    let user = users.find(item=>item.username == body.username && item.password == body.password);
    if(user){
        req.session.user = user;
        res.json({
            user,
            success:'登录成功'
        });
    }else{
        res.json({
            error:'登录失败'
        });
    }
});
app.get('/validate',function(req,res){
  let user = req.session.user;
  if(user){
    res.json({
        success:'此用户已经登录',
        user
    });
  }else{
    res.json({
        error:'此用户未登录',
    });
  }
});