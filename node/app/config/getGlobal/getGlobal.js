
/*

第一个.设置全局的最顶层的：dirname

*/

var global = {};


function getGlobal() {
    var i = 0;
    this.setPath = function(name,path) {
        global[name] = path;
    };
    this.getPath = function() {
        return global;
    };
};
module.exports = getGlobal;