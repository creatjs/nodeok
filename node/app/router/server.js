/*
服务选择性控制
*/
var http = require("http");
var URL = require("url");
var path = require("path");
var mime = require("mime");
var process = require("process");

var FServer = require("./FServer");
var dirname = __dirname;
var filename = __filename;
var getGloble = require('./getGloble/getGloble');    //设置全局变量


function start(route, handle) {

    function onRequest(request, response) {
        console.log("---request.headers.cookie--- " + request.headers.cookie);
        // 取得请求路径
        var pathname = URL.parse(request.url).pathname;
        console.log('当前目录：' + process.cwd());
        console.log('取得请求路径process.env-------',process.env.NODE_ENV);


        if (typeof handle[pathname] === 'function'){
            console.log("typeof handle[pathname] === 'function'",typeof handle[pathname] === 'function')
            route(handle, pathname, response, request);

        }else{
            //设置全局变量，访问全局唯一变量，锁住。
            //Globles = new getGloble();
            //var getpath = Globles.getPath();
            //没办法获取到../../
            //var resultPath = pathname.indexOf("plug-in");
            //var relativePath;
            //if(resultPath>0){
            //    relativePath = path.join(getpath,'../../'+pathname);
            //}else{
            //    relativePath = path.join(getpath,pathname);
            //
            //}
            //console.log('from到to的相对路径-----',relativePath);

            // 取得文件路径
            var filePath = path.resolve(dirname,'../'+pathname);
            console.log('取得文件路径---------',filePath);

            //var filePath = ; //获的绝对路径
            var type = mime.lookup(pathname); //获得类型

            FServer.filesLoad(filePath, type, request, response);
        }

    }

    http.createServer(onRequest).listen(80,'120.76.122.110');
    console.log("---服务器已经启动---.");
    //127.0.0.1
    //120.76.122.110
}

exports.start = start;