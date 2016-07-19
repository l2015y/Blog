var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var api = require('./routes/api');


var app = express();


http.createServer(app).listen(config.get('port'),function(){
    console.log('Express server listening ' + config.get('port'));
});


app.use(favicon());

if(app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err,req,res,next){
    if(app.get('env') == 'development'){
        var errorHendler = express.errorHendler();
        errorHendler(err,req,res,next);
    } else {
        res.send(500);
    }
});


app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/posts', api.posts);
app.post('/blog',api.addPost);
app.get('/api/posts/:id', api.readPost);
app.delete('/api/post/:id', api.deletePost);



