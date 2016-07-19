var mongoose = require('libs/mongoose.js');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    date: { type: Date, default: Date.now }
});

exports.Blog = mongoose.model('Blog',blogSchema);