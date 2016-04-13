

var url = require("url");       //解析GET请求
var querystring = require("querystring");    //解析POST请求
var getMongodb = require('../getMongodb/getMongodb');    //读取数据库

function getValidation(response, request){

    var _user = 'getValidation';
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
}

exports.getValidation = getValidation;