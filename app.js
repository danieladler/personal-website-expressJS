// core requirements for app to run
require('dotenv').config();
var express = require('express');
var app = express();

// requirements/setup for Evernote API:
var Evernote = require('evernote').Evernote;
var callbackUrl = "http://localhost:3000/oauth_callback";

// CONFIGURATIONS
// view engine
app.set('view engine', 'jade');

// access to public directory
app.use(express.static('public'));

// routes for views
app.get('/', function (req, res) {
  res.render('index', {title: 'dadler codes', message: 'dadler codes'})
});

app.get('/blog', function (req, res) {
  res.render('blog', {title: 'blog', message: 'blog'})
});

// Oauth for Evernote API
var oauth = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: process.env.API_CONSUMER_KEY,
    consumerSecret: process.env.API_CONSUMER_SECRET,
    sandbox: process.env.SANDBOX,
    china: process.env.CHINA
  });

  client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
    if(error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    }
    else {
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });
};

// Oauth callback for Evernote API
var oauth_callback = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: process.env.API_CONSUMER_KEY,
    consumerSecret: process.env.API_CONSUMER_SECRET,
    sandbox: process.env.SANDBOX,
    china: process.env.CHINA
  });

  client.getAccessToken(
    req.session.oauthToken,
    req.session.oauthTokenSecret,
    req.param('oauth_verifier'),
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if(error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.redirect('/blog');
      }
    });
};

// Clear session for Evernote API
var clear = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

// routes for Evernote API
app.get('/oauth', oauth);
app.get('/oauth_callback', oauth_callback);
app.get('/clear', clear);

// Make it go:

app.listen(process.env.PORT || 3000, function() {

});
