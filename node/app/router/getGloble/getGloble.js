var name;
function getGloble() {
    var i = 0;
    this.setPath = function(path) {
        name = path;
    };
    this.getPath = function() {
        return name;
    };
};
module.exports = getGloble;