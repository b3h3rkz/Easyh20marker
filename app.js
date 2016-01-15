
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , cloudinary = require('cloudinary')
  , fs = require('fs')
  , crypto = require('crypto')
  , routes = require('./routes')
  , ng = require('./routes/ng')
  , gh = require('./routes/gh')
  , user = require('./routes/user')
  , http = require('http')
  ;

var app = express();

app.locals.title = "Watermarker";

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());

cloudinary.config({
    cloud_name : 'py',
    api_key: '974375294473519',
    api_secret: 'J0qaRgA7qJK19uwBXu-G7asq1wM'
});
    
});

app.locals.api_key = cloudinary.config().api_key;
app.locals.cloud_name = cloudinary.config().cloud_name;

app.get('/', function(req, res, next){
  cloudinary.api.resources(function(items){
    res.render('index', { images: items.resources, cloudinary: cloudinary });
  });
}) ;

app.get('/ng', function(req, res, next){
  cloudinary.api.resources(function(items){
    res.render('ng', { images: items.resources, cloudinary: cloudinary });
  });
});


app.get('/gh', function(req, res, next){
  cloudinary.api.resources(function(items){
    res.render('gh', { images: items.resources, max_results: 5, cloudinary: cloudinary });
  });
});



app.post('/upload', function(req, res){
  var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })

    , cloudStream = cloudinary.uploader.upload_stream(function()                                                       
                                                      
    { res.redirect('/index'); });
    
    
  imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
   

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port', app.get('port'));
});
