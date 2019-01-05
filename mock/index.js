const user = require('./user');

/**
 * 监听http请求
 * exports 给 webpack 的函数
 */
module.exports = function(app) {
    /**
     * 登录类
     */
    app.get('/mock/necrs/server/index', (rep, res) => user.getToken(rep, res));
    app.post('/mock/necrs/server/loginByPC', (rep, res) => user.login(rep, res));
    app.get('/mock/necrs/server/checkImage', (rep, res) => user.checkImage(rep, res));
    app.get('/mock/necrs/server/reqCheckImage', (rep, res) => user.reqCheckImage(rep, res));
    app.get('/mock/necrs/server/logout', (rep, res) => user.logout(rep, res));
}
