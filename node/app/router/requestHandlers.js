//用户……注册，写入……登录取值
/*

    所有请求事件句柄

*/
var getGlobal = require('../config/getGlobal/getGlobal');    //启动配置全局变量
var path = require("path");
var mime = require("mime");
var url = require("url");       //解析GET请求
var querystring = require("querystring");    //解析POST请求
var fs = require("fs");
var formidable = require("formidable");     //上传图片模块
var util = require("util");

var FServer = require("./FServer");     //响应，返回服务
//var getSqlData = require('./getSqlData');     //读取sql数据
var getMongodb = require('./getMongodb/getMongodb');    //读取数据库

var getValidation = require("./config/getValidation");     //注册查询验证
var createUser = require("./config/createUser/createUser");     //给用户创建私有的空间文件夹

var dirname = __dirname;
var filename = __filename;



var router = {

    home:"../webpage/home/home.html",
    blog:"../webpage/blog/blog.html",
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
    console.log('90909090909090',path.dirname(router.home))
    ////设置当前的应用的路径
    //Globles = new getGlobal();
    //Globles.setPath(path.dirname(router.home));
    //Globles.getPath();

}
//blog
function blog(response, request){
    var filePath = path.resolve(dirname,router.blog);
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
    console.log('——……——……——……——……——……', request.method,result,result !== '')

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

            // 注册用户
            function getData(response,request,_user,queryObj){
                getMongodb.getMongodb(_user,queryObj,showDB);
                // 注册回调
                function showDB(db){
                    console.log('注册回调结果：：',db)
                    // 写入成功
                    // 给用户创建私有的空间文件夹
                    if(db){

                        createUser.createUser(queryObj.user);
                    }
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(JSON.stringify(db));
                    response.end();
                }
            }
            getData(response, request,_user,queryObj)

        });

    }else{
        var filePath = path.resolve(dirname,router.logup);
        console.log("~~~请求处理程序被称为“开始”~~~",filePath);
        var type = mime.lookup(filePath); //获得类型
        console.log('//获得类型',type)
        FServer.filesLoad(filePath, type, request, response);
    }

}
/*
 上传图片，（多图处理）
 写入文件，
 取出文件
 */
function uploadImg(response, request) {
    console.log("~~~请求处理程序被称为“多文件上传”~~~");
    console.log("Request handler 'upload' was called.");
    console.log('dirname',dirname)

    //首先读取用户，判断用户是否存在，不存在，注册，并写入数据库，
    //否则失败。
    //然后创建ico文件，写入图片，没有，则为默认头像，

    //创建一个新的form模式
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';//编码输入表单字段。
    fs.mkdir(path.resolve(dirname,"imgTmpData/okok"), 0777, function(){
        console.log('创建成功！')
    })

    var filePath = path.resolve(dirname,"imgTmpData");
    console.log('filePath',filePath)
    form.uploadDir = filePath;//定义储存路径
    form.keepExtensions = true;//如果你想要写入的文件形式。uploadDir包括原始文件的扩展
    form.multiples = false;//多文件上传

    console.log("about to parse");
    form.parse(request, function(err, fields, files) {
        if(err){
            console.log('err--------',err)
        }
        if(fields){
            console.log('fields------',fields)
        }
        if(files){
            console.log('files-------',files)
        }
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write('received upload:\n\n');
        response.end(util.inspect({fields: fields, files: files}));
    });


}

//注册查询验证
function validation(response, request){
    getValidation.getValidation(response, request);
}



exports.login = login;
exports.logup = logup;
exports.home = home;
exports.blog = blog;


exports.validation = validation;//用户身份验证
