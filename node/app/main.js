
var server = require("./router/server");
var router = require("./router/router");
var requestHandlers = require("./router/requestHandlers");

var dirname = __dirname;//获取引用的绝对路径，全局的
console.log('获取引用的绝对路径，全局的',dirname)
var handle = {}

handle["/"] = requestHandlers.home;
handle["/home"] = requestHandlers.home;
handle["/blog"] = requestHandlers.blog;
handle["/login"] = requestHandlers.login;//登录
handle["/logup"] = requestHandlers.logup;//注册


//启动开始
server.start(router.route, handle);