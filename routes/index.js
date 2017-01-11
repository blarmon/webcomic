var express = require('express');
var router = express.Router();
var Comic = require('../models/comic');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/latest');
});

router.get('/admin', function(req, res, next) {
    res.render('admin');
});

router.post('/admin', function(req, res, next) {
    var newComic = new Comic ({
      imagePath: req.body.imagepath,
      title: req.body.title,
      alt: req.body.alt,
      description: req.body.description,
      comicNumber: req.body.comicnumber,
      date: req.body.date
    });
    
    newComic.save(function(err, result){
			console.log('comic saved');
	});
    
    res.render('admin', { newComic: newComic });
});

router.get('/store', function(req, res, next) {
   res.render('store', {title: 'store'}); 
});

router.get('/archive', function(req, res, next) {
  Comic.find(function(err, docs) {
      if (err) {
          //res.render('error.hbs')
      }
      docs.reverse();
      res.render('archive', { comics: docs, title: 'archive'});
  });
});

router.get('/random', function(req, res, next) {
    
  Comic.find(function(err, docs) {
      if (err) {
          res.render('error.hbs')
      }
     var randomInt = getRandomInt(1, docs.length);
     var redirectURL = '/' + randomInt;
     console.log(redirectURL);
     res.redirect(redirectURL);
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'About'});
});

router.get('/latest', function(req, res, next) {
  //saving to variable property and all that must be done in a callback because mongodb operations are done asynchronously
  Comic.find(function(err, docs) {
      if (err) {
          console.log('dawg, error:')
          res.render('error.hbs')
      }
      var prevComic = docs.length-1;
      var prevURL = '/' + prevComic;
     res.render('index', { title: 'Webcomic site nice', comic: docs[docs.length-1], latest: true, prev: prevURL, next: null }); 
  });
});

router.get('/:comicNumber', function(req, res, next) {
        var comicNumber = Number(req.params.comicNumber);
  //saving to variable property and all that must be done in a callback because mongodb operations are done asynchronously
  Comic.find(function(err, docs) {
      if (err) {
          res.render('error.hbs')
      }
      //if the url is the latest comic then we need to adjust the comic number accordingly for math to work
      var prevComic = comicNumber - 1;
      var nextComic = comicNumber + 1;
      if (prevComic < 1) {
          var first = true;
      }
      //assiging the URL in the template using handlebars appears not to work, so here we are.
      var prevURL = '/' + prevComic;
      var nextURL = '/' + nextComic;
      //figure out which Comic object we're working with!
      var thisComic = {};
      var numberOfComics = docs.length;
      for( var i = 0; i < docs.length; i++) {
          if (comicNumber == docs[i].comicNumber) {
              thisComic = docs[i];
          }
      }
      //the done variable is here to make sure that headers aren't set more than once, which obviously crashes the site.
      //redirect is asynchronous, so he code will keep running after a call to it.
      var done = false;
      if (comicNumber > numberOfComics || comicNumber < 0 || isNaN(comicNumber)){
            res.render('noComic');
            done = true;
      }
      //if we're on the latest comic, redirect to the '/latest' URL, because it does a couple of things this route does not. 
      if (!done && thisComic.comicNumber == numberOfComics){
        res.redirect('/latest');
      }
      //this else HAS to be here, or else the redirect seems to get called multiple times and we get an error?  something
      //to do with the asynchronous nature of the function probably
      else if (!done) {
          console.log(first);
        res.render('index', { title: 'Webcomic site nice', comic: thisComic, latest: false, first: first, prev: prevComic, next: nextComic }); 
      }
  });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = router;
