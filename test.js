var http = require('http');

var http = require('http');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('运行nodejs是不是很简单。');
    response.end('返回结束。')
}).listen("80",'120.76.122.110');
console.log('.........')

//