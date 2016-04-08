/*
服务选择性控制
*/
var http = require("http");
var URL = require("url");
var path = require("path");
var mime = require("mime");

var FServer = require("./FServer");
var dirname = __dirname;



function start(route, handle) {
    function onRequest(request, response) {
        // 取得文件路径
        var pathname = URL.parse(request.url).pathname;
        console.log('pathname--------',typeof  pathname,pathname)

        if (typeof handle[pathname] === 'function'){
            console.log("typeof handle[pathname] === 'function'",typeof handle[pathname] === 'function')
            route(handle, pathname, response, request);

        }else{
            var filePath = path.resolve(dirname,'../'+pathname);

            console.log("~~~获的绝对路径“开始”~~~",filePath);

            //var filePath = ; //获的绝对路径
            var type = mime.lookup(pathname); //获得类型

            FServer.filesLoad(filePath, type, request, response);
        }

    }

    http.createServer(onRequest).listen(8080,'127.0.0.1');
    console.log("---服务器已经启动---.");
}

exports.start = start;