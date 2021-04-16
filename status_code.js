const codeEnum = {
    SUCCESS: {
        code: 200,
        msg: 'succsss'
    },
    SOURCE_NO_EXSIT: {
        code: 404,
        msg: 'source is not exist'
    },
    SERVER_ERROR: {
        code: 500,
        msg: 'server error'
    },
    
    /* 用户 */
    USER_NO_EXSIT: {
        code: 2001,
        msg: 'user not exsit'
    },
    USER_HAS_EXISTED: {
        code: 2002,
        msg: 'user has exsited'
    },
    STUID_HAS_EXISTED: {
        code: 2004,
        msg: 'stu id has exsited'
    },
    STUID_NO_EXISTED: {
        code: 2005,
        msg: 'stu id no exsited'
    },
    USER_HAS_FORZED: {
        code: 2003,
        msg: 'user has been forzed'
    },
    PASSWORD_WRONG: {
        code: 2006,
        msg: 'user password is wrong'
    },
    PASSWORD_CORRECT: {
        code: 2007,
        msg: 'user password is correct'
    },

    /* 数据库 */
    INSERT_SUCCESS: {
        code: 3000,
        msg: 'insert success'
    },
    INSERT_FAILD: {
        code: 3001,
        msg: 'insert faild, user is exsist'
    },

    /* 帖子 */
    PUSH_SUCCESS: {
        code: 4000,
        msg: 'push success'
    },
    GET_SUCCESS: {
        code: 4001,
        msg: 'get success'
    }
}

module.exports =  codeEnum;