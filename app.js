var express = require('express');
var app = express();

// view engine
app.set('view engine', 'jade');

// access to public directory
app.use(express.static('public'));

// routes
app.get("/", function (req, res) {
  res.render('index', {title: "dadler codes", message: "content here"})
});

app.listen(3000, function() {

});
