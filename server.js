// server.js
var connect  = require('connect');
var compiler = require('connect-compiler');
var static = require('serve-static');

var server = connect();
server.listen(3000);

var livereload = require('livereload');
var server = livereload.createServer({
    originalPath: "http://localhost:7777/emall.id"
});
server.watch([__dirname + "/assets", __dirname + "/templates"]);