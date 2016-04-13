
/*

nodejs  服务器

*/
var server = require("./router/server");
var router = require("./router/router");
var requestHandlers = require("./router/requestHandlers");

var getGlobal = require('./config/getGlobal/getGlobal');    //启动配置全局变量


var dirname = __dirname;//获取引用的绝对路径，全局的
var handle = {}

handle["/"] = requestHandlers.home;
handle["/home"] = requestHandlers.home;
handle["/blog"] = requestHandlers.blog;
handle["/login"] = requestHandlers.login;//登录
handle["/logup"] = requestHandlers.logup;//注册

handle["/validation"] = requestHandlers.validation;//注册查询验证

//设置当前的应用的路径
getGlobal = new getGlobal();
getGlobal.setPath('dirname',dirname);
//var result = getGlobal.getPath();
//console.log(result)

//启动开始
server.start(router.route, handle);