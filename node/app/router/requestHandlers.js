//用户……注册……登录取值
/*
请求所有事件句柄
*/
var path = require("path");
var mime = require("mime");
var url = require("url");       //解析GET请求
var querystring = require("querystring");    //解析POST请求
var fs = require("fs");
var formidable = require("formidable");
var util = require("util");

var FServer = require("./FServer");     //响应，返回服务
var getMongodb = require('./getMongodb/getMongodb');    //读取数据库



//var getSqlData = require('./getSqlData');
var dirname = __dirname;
var filename = __filename;


var router = {

    home:"../webpage/home/home.html",
    login:"../webpage/login/login.html",
    logup:"../webpage/logup/logup.html"

}
//主页
function home(response, request){
    var filePath = path.resolve(dirname,router.home);
    console.log("~~~请求处理程序被称为“开始”~~~",filePath);
    var type = mime.lookup(filePath); //获得类型
    console.log('//获得类型',type)
    FServer.filesLoad(filePath, type, request, response);
}
//登录
function login(response, request) {
    var _user = 'login';
    var result = url.parse(request.url,true).search;

    if(request.method === "GET" && result !== ''){
        console.log('get');
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("get");
        response.end();
    }
    else if(request.method === "POST"){

        var postData = "";
        request.setEncoding("utf8");
        request.addListener("data",function(postDataChunk) {
            postData += postDataChunk;
            console.log("postDataChunk",postDataChunk);
        });
        //解析post数据
        request.addListener("end", function() {
            var queryObj = querystring.parse(postData)

            //操作数据库，增查
            //获取mongodb数据,返回结果
            function getData(response, request,_user,queryObj){
                getMongodb.getMongodb(_user,queryObj,showDB);//
                function showDB(db){
                    console.log('-------------',db,'++++++++++++++++++++')
                    response.writeHead(200, {"Content-Type": "text/json"});
                    response.write(""+JSON.stringify(db));
                    response.end();
                }
            }
            getData(response, request,_user,queryObj)

        });

    }else{
        var filePath = path.resolve(dirname,router.login);
        console.log("~~~请求处理程序被称为“开始”~~~",filePath);
        var type = mime.lookup(filePath); //获得类型
        console.log('//获得类型',type)
        FServer.filesLoad(filePath, type, request, response);
    }



}
//注册
function logup(response, request) {
    var _user = 'logup';
    var result = url.parse(request.url,true).search;
    console.log('_+_+_+_+_+_+_+_+_+_', request.method,result,result !== '')

    if(request.method === "GET" && result !== ''){
        console.log('get');
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("get");
        response.end();
    }
    else if(request.method === "POST"){
        console.log('POST--------login--');

        var postData = "";
        request.setEncoding("utf8");
        request.addListener("data",function(postDataChunk) {
            postData += postDataChunk;
        });
        //解析post数据
        request.addListener("end", function() {
            console.log("end")
            var queryObj = querystring.parse(postData)

            //操作数据库，增查
            //获取mongodb数据,返回结果
            function getData(response,request,_user,queryObj){
                getMongodb.getMongodb(_user,queryObj,showDB);//
                function showDB(db){
                    console.log('-----45345--------',db,'++++++++++423432++++++++++')
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(JSON.stringify(db));
                    response.end();
                }
            }
            getData(response, request,_user,queryObj)

        });
        //
        //
        //
        //response.writeHead(200, {"Content-Type": "text/html"});
        //response.write("received image:<br/>");
        //response.write("post");
        //response.end();
    }else{
        var filePath = path.resolve(dirname,router.logup);
        console.log("~~~请求处理程序被称为“开始”~~~",filePath);
        var type = mime.lookup(filePath); //获得类型
        console.log('//获得类型',type)
        FServer.filesLoad(filePath, type, request, response);
    }

}





exports.login = login;
exports.logup = logup;
exports.home = home;
