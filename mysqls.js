const fs = require('fs');
const mysql = require('mysql');
const statusCodeEnum = require('./status_code')
const conf = require('./conf');
const connection = mysql.createConnection(conf);
const chalk = require('chalk');
const { user } = require('./conf');

connection.connect();

module.exports = {

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