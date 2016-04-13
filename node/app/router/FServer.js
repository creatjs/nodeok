/*
响应返回的文件
加载html，css，js，img，video，radio
*/
var fs   = require('fs');
var mime = require('mime');

function filesLoad(filePath, type, req, res){

    fs.exists(filePath, function(exists){
        console.log("~~~获的绝对路径“开始”~~~",exists,filePath);

        if ( !exists ) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("FServer响应返回的文件404");
            res.end();
        } else {

            fs.readFile(filePath, function(err, file){

                if ( err ) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    // res.write();
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': type});
                    res.write(file);
                    res.end();
                }
            });
        }
    })
}

exports.filesLoad = filesLoad;