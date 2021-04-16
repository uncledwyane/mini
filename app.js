const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const cors = require('express-cors');
const mysqls = require('./mysqls');
const chalk = require('chalk');
// 导入状态码
const statusCodeEnum = require('./status_code');
const codeEnum = require('./status_code');
const { checkPassword } = require('./mysqls');

// 导入sql查询

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors({
    allowedOrigins: [
        'github.com', 'google.com', 'http://localhost:3000'
    ]
}))

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.post('/savevideo', function(req, res){
    console.log(req.body)
    res.send(req.body)
})

app.post('/login', function(req, res){
    var user = {
        nickName: req.body.nickName,
        password: req.body.password
    }
    mysqls.checkUickNameIsExist(user.nickName).then(function(result){
        if(result.code && result.code == 2002){
            mysqls.checkPassword(user.nickName, user.password).then(function(passres){
                res.send(passres)
            })
        }else{
            res.send(result);
        }
    })
})

app.post('/registe', function(req, res){
    var user = {
        nickName: req.body.nickName,
        avatarUrl: req.body.avatarUrl,
        gender: req.body.gender,
        password: req.body.password,
        stuId: req.body.stuId
    }
    console.log(user);
    mysqls.checkUickNameIsExist(user.nickName).then(function(result){
        if(result.code && result.code == 2002){
            res.send(result);
        }else{
            mysqls.checkStuIdIsExist(user.stuId).then(function(result){
                console.log('checkStuIdIsExist: ', result)
                if(result.code == 2004){
                    res.send(result)
                }else{
                    mysqls.registeUser(user).then(function(result){
                        res.send(result);
                    })
                }
            })
        }
    })
})

app.listen(3000, function (){
    console.log('app listen on port 3000...')
})

function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}