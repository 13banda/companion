var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

require('request-debug')(request);

var hasuraRouter = require('./hasuraRoutes');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', hasuraRouter);


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
