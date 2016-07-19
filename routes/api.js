var Blog = require('models/blogs').Blog;
var mongoose = require('libs/mongoose.js');


exports.posts = function(req,res,next){
Blog.find({}, function(err,blogs){
    if(err) return next(err);
    res.json(blogs);
})
};


exports.addPost = function(req,res,next){
    var title = req.body.title;
    var author = req.body.author;
    var body = req.body.body;
    var date =  Date.now;
    var blog = new Blog({title:title, author:author, body:body});
    blog.save(function(err,blog){
        if(err){return next (err);
        } else {
            res.send('blog was added');
        }
    });
};


exports.readPost = function(req,res,next){
    var id = req.params.id;
    Blog.findOne({_id: id}, function(err,blog){
        if(err) {
            return next(err);
        }else {
            res.json(blog);
        }
    })
};


exports.deletePost = function(req,res,next){
    var id = req.params.id;
    Blog.remove({_id: id}, function(err) {
        if (err) {
            return next(err)
        }
        else {
            res.send('blog was deleted' );
        }
    });
};