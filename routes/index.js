var fs = require('fs');

exports.index = function(req,res){
    var file = new fs.ReadStream('public/templates/index.html');
    sendFile(file,res);
};

function sendFile(file,res){
    file.pipe(res);
    file.on('error',function(err){
        res.statusCode=500;
        res.end('Server error');
        console.error(err);
    });
    file.on('close', function(){
        file.destroy();
    });
}


 exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('templtes/' + name);
};