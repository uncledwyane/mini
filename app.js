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


app.post('/savequestion', function(req, res){
    console.log('/savequestion body: ', req.body);

    mysqls.saveQuestion(req.body).then(function(result){
        res.send(result);
    })
})

app.post('/savereplay', function(req, res){
    console.log('/savequestion body: ', req.body);
    mysqls.saveReplay(req.body).then(function(result){
        res.send(result);
    })
})

app.get('/allreplay', function(req, res){
    mysqls.getReplayByQid(req.query.q_id).then(function(result){
        res.send(result);
    })
})


app.post('/getquestions', function(req, res){
    console.log('/getquestions body: ', req.body);

    mysqls.getQuestionByVid(req.body.v_id).then(function(result){
        res.send(result);
    })
})

app.get('/getvideobycate', function(req, res){
    console.log('/getvideobycate body: ', req.query.cate);
    mysqls.getVideoByCate(req.query.cate).then(function(result){
        console.log('/getvideobycate success return: ', result);

        res.send(result);
    })
})

app.get('/allcate', function(req, res){
    mysqls.getAllCate().then(function(result){
        res.send(result);
    })
})

app.post('/searchvideo', function(req, res){
    mysqls.searchVideo(req.body.keyword).then(function(result){
        res.send(result)
    })
})

app.get('/allvideo', function(req, res){
    mysqls.getAllVideo().then(function(result){
        res.send(result);
    })
})

app.post('/watch', function(req, res){
    mysqls.saveWatchHis(req.body).then(function(result){
        res.send(result);
    })
})

app.post('/deleteuser', function(req, res){
    mysqls.deleteUser(req.body.nickname).then(function(result){
        res.send(result)
    })
})

app.post('/deletevideo', function(req, res){
    mysqls.deleteVideo(req.body.v_id).then(function(result){
        res.send(result)
    })
})
app.post('/deletecate', function(req, res){
    mysqls.deleteCate(req.body.catename).then(function(result){
        res.send(result)
    })
})
app.post('/addcate', function(req, res){
    mysqls.addCate(req.body.catename).then(function(result){
        res.send(result)
    })
})

app.get('/watchbyusername', function(req, res){
    mysqls.watchByUsername(req.query.username).then(function(result){
        res.send(result);
    })
})

app.get('/uploadbyusername', function(req, res){
    mysqls.uploadByUsername(req.query.username).then(function(result){
        res.send(result);
    })
})
app.get('/alluser', function(req, res){
    mysqls.getAllUser().then(function(result){
        res.send(result);
    })
})
app.get('/allvideo', function(req, res){
    mysqls.getAllUser().then(function(result){
        res.send(result);
    })
})



app.post('/updatepass', function(req, res){
    mysqls.updatePass(req.body.username, req.body.password).then(function(result){
        res.send(result)
    })
})

app.post('/deleteallwatch', function(req, res){
    mysqls.deleteAllWatch(req.body.username).then(function(result){
        res.send(result)
    })
})

app.post('/addcate', function(req, res){
    mysqls.addCate(req.body.cate).then(function(result){
        res.send(result);
    })
})

app.post('/deletecate', function(req, res){
    mysqls.deleteCate(req.body.cate).then(function(result){
        res.send(result);
    })
})

app.post('/savevideo', function(req, res){
    console.log('/savevideo body: ', req.body);
    mysqls.saveVideo(req.body).then(function(result){
        console.log('/savevideo success return: ', result);

        res.send(result);
    })
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