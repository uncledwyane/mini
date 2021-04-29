const fs = require('fs');
const mysql = require('mysql');
const statusCodeEnum = require('./status_code')
const conf = require('./conf');
const connection = mysql.createConnection(conf);
const chalk = require('chalk');
const { user } = require('./conf');

connection.connect();

module.exports = {

    getVideoByCate(cate){
        var querySentence = `SELECT * FROM video WHERE cate='${cate}'`;
        return this.normalGet(querySentence);
    },

    getAllUser(){
        return this.normalGet(`SELECT * FROM user`);
    },

    deleteUser(nickname){
        var querySentence = `DELETE FROM user WHERE nickname='${nickname}'`;
        return this.normalGet(querySentence);
    },

    deleteVideo(v_id){
        var querySentence = `DELETE FROM video WHERE v_id='${v_id}'`;
        return this.normalGet(querySentence);
    },

    deleteCate(catename){
        var querySentence = `DELETE FROM cate WHERE catename='${catename}'`;
        return this.normalGet(querySentence);
    },

    addCate(catename){
        var querySentence = `INSERT INTO cate(catename) VALUES('${catename}')`;
        return this.normalGet(querySentence);
    },

    getAllVideo(){
        return this.normalGet(`SELECT * from video`);
    },

    getAllCate(){
        return this.normalGet(`SELECT catename FROM cate`);
    },

    addCate(cate){
        return this.normalGet(`INSERT INTO cate(catename) VALUES('${cate}')`);
    },


    saveVideo: function(videoObj){
        var v_id = 'vid_' + parseInt((Math.random(10) * 1000000000));
        var querySentence = `INSERT INTO video(v_id, vname, vdesc, url, cate, date) VALUES(
            '${v_id}',
            '${videoObj.name}',
            '${videoObj.desc}',
            '${videoObj.url}',
            '${videoObj.cate}',
            '${videoObj.date}'
        )`;
        this.saveVideoHis(v_id, videoObj.username);
        return this.normalGet(querySentence);
    },

    deleteAllWatch(username){
        return this.normalGet(`DELETE FROM watchhis WHERE username='${username}'`)
    },

    checkWatch(videoObj){
        return this.normalGet(`SELECT * FROM watchhis WHERE v_id='${videoObj.v_id}' and username='${videoObj.username}'`)
    },

    searchVideo(keyword){
        return this.normalGet(`SELECT * FROM video WHERE vname LIKE '%${keyword}%'`);
    },

    saveWatchHis: function(videoObj){
        var self = this;
        var querySentence = `INSERT INTO watchhis(v_id, username) VALUES(
            '${videoObj.v_id}',
            '${videoObj.username}'
        )`;
        return this.normalGet(querySentence);

        // self.checkWatch(videoObj).then(function(res){
        //     if(res.data.length > 0){
        //         return this.normalGet(`SELECT * FROM watchhis WHERE v_id='${videoObj.v_id} and username='${videoObj.username}'`);   
        //     }else{
        //         return this.normalGet(querySentence);
        //     }
        // })
    },

    saveQuestion(question){
        var q_id = 'q_id' + parseInt((Math.random(10) * 1000000000));
        return this.normalGet(`INSERT INTO question(v_id, q_id, q_content, q_username) VALUES(
            '${question.v_id}',
            '${q_id}',
            '${question.q_content}',
            '${question.q_username}'
        )`);
    },

    saveReplay(replay){
        var r_id = 'r_id' + parseInt((Math.random(10) * 1000000000));
        return this.normalGet(`INSERT INTO replay(r_id, r_content, q_id, r_username) VALUES(
            '${r_id}',
            '${replay.content}',
            '${replay.q_id}',
            '${replay.username}'
        )`);
    },

    getReplayByQid(qId){
        return this.normalGet(`SELECT * FROM replay WHERE q_id='${qId}'`)
    },

    getQuestionByVid(vId){
        return this.normalGet(`SELECT * FROM question WHERE v_id='${vId}'`);
    },

    getReplayByVid(vId){
        return this.normalGet(`SELECT * FROM question WHERE v_id='${vId}'`);
    },

    watchByUsername(username){
        return this.normalGet(`SELECT * from video WHERE v_id in(select v_id from watchhis WHERE username='${username}')`)
    },

    updatePass(username, password){
        var querySentence = `update user set password='${password}' where nickname='${username}'`;
        return this.normalGet(querySentence);
    },
    
    uploadByUsername(username){
        return this.normalGet(`SELECT * from video WHERE v_id in(select v_id from videohis WHERE username='${username}')`)
    },

    saveVideoHis: function(vid, username){
        var querySentence = `INSERT INTO videohis(v_id,  username) VALUES(
            '${vid}',
            '${username}'
        )`;
        connection.query(querySentence);
    },
    registeUser(user){
        var querySentence = `INSERT INTO user(nickname, avatar_url, gender, role, password, stu_id) VALUES(
            ${'\''+ user.nickName +'\''},
            ${'\''+ user.avatarUrl +'\''},
            ${'\''+ user.gender +'\''},
            ${'\''+ '普通用户' +'\''},
            ${'\''+ user.password +'\''},
            ${'\''+ user.stuId +'\''}
        )`;
        return this.normalGet(querySentence);
    },

    checkUickNameIsExist(nickName){
        var querySentence = `SELECT * FROM user WHERE nickname=${'\''+ nickName + '\''}`;
        return this.generalGet(querySentence, statusCodeEnum.USER_HAS_EXISTED, statusCodeEnum.USER_NO_EXSIT)
    },

    checkStuIdIsExist(stuId){
        var querySentence = `SELECT * FROM user WHERE stu_id=${'\''+ stuId + '\''}`;
        return this.generalGet(querySentence, statusCodeEnum.STUID_HAS_EXISTED, statusCodeEnum.STUID_NO_EXISTED)
    },

    checkPassword(nickName, password){
        var querySentence = `SELECT * FROM user WHERE nickname=${'\''+ nickName + '\''} and password=${'\''+ password + '\''}`
        return this.generalGet(querySentence, statusCodeEnum.PASSWORD_CORRECT, statusCodeEnum.PASSWORD_WRONG)
    },

    generalGet: function (querySentence, statusCodeSuccess, statusCodeFaild){
        console.log(chalk.magentaBright('recived query: ', querySentence));
        return new Promise(function (resolve, reject){
            connection.query(querySentence, function (error, results, fields){
                if(error){
                    reject(error);
                }
                if(results && results.length > 0){
                    resolve({
                        code: statusCodeSuccess.code,
                        msg: statusCodeSuccess.msg,
                        data: results
                    })
                }else{
                    if(statusCodeFaild){
                        resolve({
                            code: statusCodeFaild.code,
                            msg: statusCodeFaild.msg
                        })
                    }
                }
                resolve();
            })
        })
    },

    normalGet: function(querySentence){
        console.log(chalk.magentaBright('recived query: ', querySentence));
        var statusCodeSuccess = statusCodeEnum.SUCCESS;
        return new Promise(function (resolve, reject){
            connection.query(querySentence, function (error, results, fields){
                if(error){
                    reject(error);
                }
                if(results && results.length > 0){
                    resolve({
                        code: statusCodeSuccess.code,
                        msg: statusCodeSuccess.msg,
                        data: results
                    })
                }
                resolve();
            })
        })
    },
    getCurrentTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    formatDateTime(date){
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    forMatDate(date){
        var newDate = date;
        return newDate.split('T')[0];
    },
    getAge(birthday){
        return new Date().getFullYear() - parseInt(birthday.split('T')[0].split('-')[0]);
    }
}