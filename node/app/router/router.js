/*

路由处理

*/
var http = require("http");
var URL = require("url");
var path = require("path");
var mime = require("mime");
var process = require("process");
var fs = require("fs");
var FServer = require("./FServer");

var dirname = __dirname;
var filename = __filename;
//var getGloble = require('././getGlobal');    //设置全局变量






function route(handle, response,request) {
    console.log("客户端cookie::" + request.headers.cookie);
    // 取得请求路径
    var pathname = URL.parse(request.url).pathname;
    console.log('请求目录::' + pathname);
    var type = mime.lookup(pathname);
    // 获得类型
    console.log('请求文件类型::',type)


    //：：如果是网页主目录
    if (typeof handle[pathname] === 'function') {

        handle[pathname](response,request);

    }
    //：：如果是用户空间路由
    else if(type === "application/octet-stream"){
        var resultPath = pathname.indexOf("user");
        if(resultPath>0){
            console.log('用户空间路由!')
            // 取得文件路径
            //获的绝对路径
            var filePath = path.resolve(dirname,'../data/publicPage/userPage.html');
            //获得类型
            var type = mime.lookup(filePath);
            console.log('取得文件路径>>>>>>>>>>>',type,filePath);

            FServer.filesLoad(filePath, type, request, response);
        }
    }
    //：：如果是直接返回需要的文件
    else if(type !== ""){
        //设置全局变量，访问全局唯一变量，锁住。
        //Globles = new getGlobal();
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

        //取得文件路径
        //获的绝对路径
        var filePath = path.resolve(dirname,'../'+pathname);
        console.log('取得文件路径>>>>>>>>>>>',filePath);
        //获得类型
        var type = mime.lookup(pathname);
        FServer.filesLoad(filePath, type, request, response);
    }
    //：：如果什么都没有不符合
    else {
        console.log("---没有发现请求处理程序--- " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;