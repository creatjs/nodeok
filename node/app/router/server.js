/*

启动服务    启动路由    启动事件    启动回调

*/
var http = require("http");
var URL = require("url");
var path = require("path");
var mime = require("mime");
var process = require("process");

var FServer = require("./FServer");
var dirname = __dirname;
var filename = __filename;
//var getGloble = require('././getGlobal');    //设置全局变量


function start(route, handle) {

    function onRequest(request, response) {

            route(handle, response, request);

    }

    http.createServer(onRequest).listen(80,'120.76.122.110');
    console.log("（0.0）服务启动成功！");
    //127.0.0.1
    //120.76.122.110
}

exports.start = start;