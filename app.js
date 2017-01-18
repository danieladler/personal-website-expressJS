require('dotenv').config();

var express = require('express');
var app = express();

// view engine
app.set('view engine', 'jade');

// access to public directory
app.use(express.static('public'));

// routes
app.get("/", function (req, res) {
  res.render('index', {title: "dadler codes", message: "dadler codes"})
});

app.get('/resume', function(req, res){
  var file = __dirname + '/public/attachments/daniel_adler_resume.pdf';
  res.download(file);
});

app.listen(process.env.PORT || 3000, function() {

});
