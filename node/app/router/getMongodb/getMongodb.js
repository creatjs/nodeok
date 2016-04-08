//登录注册为例来说明如何使用
//交互模式
//连接数据库服务器
//打开数据库
//操作数据库CRUD



/*

//引入mongodb模块
var mongodb = require('mongodb');


//数据库服务器
var port = 27017
var server = new mongodb.Server('localhost', port , {auto_reconnect:true});


//Creates a new Db instance
var dbName = 'mydb';
var db = new mongodb.Db(dbName, server);


//打开数据库
db.open(function(err, db){
    if(err) {
        return console.log('connect db');
    };
    // 第2种连接方式
    db.createCollection(dbName, {safe:true}, function(err, collection) {
        if (err) {
            console.log(err);
        } else {
            console.log(collection.find())
            // 查询数据
            //var tmp1 = {title:'hello'};
            //var tmp2 = {title:'world'};
            //collection.insert([tmp1,tmp2],{safe:true},function(err,result){
            //    console.log(result);
            //});
            //collection.find().toArray(function(err,docs){
            //    console.log('find');
            //    console.log(docs);
            //});
            //collection.findOne(function(err,doc){
            //    console.log('findOne');
            //    console.log(doc);
            //});
        }
    })

});


*/
//nodejs操作数据库接口方法
//这个是独立的用户注册登录模块
//查询数据
//返回查询到的结果
function getMongodb(user,queryObj,call_fun){

    var _user = user;
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/user';

    if(_user === "login"){
        getlogin()
    }else{
        getlogup()
    }


    function getlogin(){
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            selectData(db, function(result) {
                call_fun(result);// 执行回调函数
                db.close();
            });
        });

        function selectData(db, callback) {
            //连接到表
            var collection = db.collection('user');
            var name = queryObj.user;
            var password = queryObj.password;
            console.log("获取到的参数",name,password)

            //先查看用户所有的数据

            //先检测用户是否存在，如果是，则再检查密码是否正确


            //查询数据
            //注册，查询用户名是否存在,</如果用户曾在返回，用户存在。如果用户不存在，返回注册成功哦/>

            if(name === ''){return}//测试未知bug
            var whereStr = {name:name,password:password};
            collection.find(whereStr).toArray(function(err, result) {
                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                }
                if(result.length === 0){//写入数据
                    console.log('用户名或密码错误')
                    callback(false);
                    //insertData(db, callback,name,password);
                }else{
                    console.log('用户登录成功----------')
                    callback(true);

                }
            });

            return 'call_fun(k)';
        }
    }

    function getlogup(){
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            selectData(db, function(result){
                call_fun(result);// 执行回调函数
                db.close();
            });
        });

        function selectData(db, callback) {
            //连接到表
            var collection = db.collection('user');
            var name = queryObj.user;
            var password = queryObj.password;
            var email = queryObj.email;
            var phone = queryObj.phone;
            console.log("获取到的参数login",name,password,phone,email)

            //先查看用户所有的数据

            //先检测用户是否存在，如果是，则再检查密码是否正确


            //查询数据
            //注册，查询用户名是否存在,</如果用户曾在返回，用户存在。如果用户不存在，返回注册成功哦/>

            if(name === ''){return}//测试未知bug//此处为何一直循环查找
            var whereStr1 = {name:name};
            var whereStr2 = {phone:phone};
            var whereStr3 = {email:email};

            collection.find({$or:[whereStr1,whereStr2,whereStr3]}).toArray(function(err, result) {
                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                }
                console.log(result.length)
                if(result.length === 0){//写入数据
                    insertData(db, callback,name,password,phone,email);
                    callback(true);
                }else{
                    console.log('用户被注册了...',result);
                    callback(false);
                }
            });

            return 'call_fun(k)';
        }
    }


}

//写入数据
function insertData(db, callback,name,password,phone,email) {
    //连接到表
    var collection = db.collection('user');
    //插入数据
    var data = {"name":name,"password":password,"phone":phone,"email":email};
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback('注册成功....');
    });
}

//更新数据
var updateData = function(db, callback) {
    //连接到表
    var collection = db.collection('user');
    //更新数据
    var whereStr = {"name":'wilson001'};
    var updateStr = {$set: { "age" : 100 }};
    collection.update(whereStr,updateStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

//var mongodata = 'lalalala';
//function getName(name){
//    console.log('name',JSON.stringify(name) )
//    mongodata = name;
//    console.log('结果',mongodata)//'可以',
//}
//getMongodb(getName);
//console.log('打印的数据',mongodata);//'lalalala',但是这里失败


exports.getMongodb = getMongodb;



























