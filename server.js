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