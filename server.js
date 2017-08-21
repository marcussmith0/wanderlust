// ./server.js
// Load dependencies
var express      = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash');
var passport     = require('passport');
// TOOL TO MAKE AJAX REQUESTS
var fetch = require('node-fetch');


var app = express();

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: "thisisanapp",
                            proxy: true,
                            resave: true,
                            saveUninitialized: true
                        }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect('mongodb://localhost/cloudinary-instagram');

app.set('port', process.env.PORT || 8080);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
require('./routes/routes')(app);
require("./routes/auth-routes")(app, passport);

var port = app.get('port');
app.listen(port, function () {
    console.log('App running at ' + port);
});
=======

// TOOL TO MAKE URL STRINGS: https://nodejs.org/api/querystring.html
var querystring = require('querystring');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public/javascript"));

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/public/yelp.html");
});

app.get('/api/:postalCode', function (req, res) {
    // ENTER YOUR SEARCH TERM HERE
    var searchTerm = "";
    var zipCode = req.params.postalCode;
    var qs = querystring.stringify({
        term: searchTerm,
        location: zipCode
    });
    // ENTER YOUR API URL
    var url = "https://api.yelp.com/v3/businesses/search?" + qs;
    var params = {
        headers: {
            Authorization: "Bearer W6DsQNPFIyD6bXdUTGnRj3F47JJQq60H1xXAX82YHQQ1GM-yedZcm0SR-VMFn726zLkvAR32d_DTp4WpCXxVvf5mrWCaUWrb51Z7A9UhbvjlqYrHrEKK9ZB6Ik_5WHYx"
        },
        method: "GET",
        // body: {
            // location: zipCode,
            // term: searchTerm
        // }
    };
    console.log("Zip code is " + zipCode);
    
    /**
    * For our request to the Yelp API, we'll use the Fetch API
    * 
    * Reading: https://davidwalsh.name/fetch
    * Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    */
    fetch(url, params)
    .then(resYelp => resYelp.json()) // Return JSON and pass it to the next `then`
    .then(yelpJson => res.send(yelpJson))
    .catch(function (err) {
        console.log("An error occurred");
        res.send(err);
    });
});


