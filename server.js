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
const PORT = process.env.PORT || 8080;

var url = process.env.MONGODB_URI || 'mongodb://localhost/cloudinary-instagram';

var app = express();

require('./config/passport')(passport);
mongoose.connect(url);


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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
require('./routes/yelp-routes')(app);
require('./routes/routes')(app);
require("./routes/auth-routes")(app, passport);

app.listen(PORT, function () {
    console.log('App running at ' + PORT);
});