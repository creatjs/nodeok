

var path = require("path");
var fs = require("fs");

function createUser(fileName){
    var getGlobal = require('../../../config/getGlobal/getGlobal');    //启动配置全局变量
    getGlobal = new getGlobal();
    var dirname = getGlobal.getPath()['dirname'];

    fs.mkdir(path.resolve(dirname,path.join("data/user/",fileName)), 0777, function(){
        fs.mkdir(path.resolve(dirname,path.join("data/user/",fileName,'headerIco')), 0777, function(){
            console.log('创建用户文件夹成功！')
        })
        fs.mkdir(path.resolve(dirname,path.join("data/user/",fileName,'photo')), 0777, function(){
            console.log('创建用户文件夹成功！')
        })
    })

}

exports.createUser = createUser;