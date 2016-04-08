/*
路由处理
*/
var fs = require("fs");
var path = require("path");


function route(handle, pathname, response,request) {
    console.log("---路由请求目录--- " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response,request);
    } else {
        console.log("---没有发现请求处理程序--- " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;