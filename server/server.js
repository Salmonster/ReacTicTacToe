var express = require('express');
var Path = require('path');
var morgan = require('morgan');
var app = express();
var routes = express.Router();

var assetFolder = Path.resolve(__dirname, '../client');
routes.use(express.static(assetFolder));



routes.post('/pick', function(req, res) {
  // put the checkForWinner logic here to measure the array/state values in req.body and return
  // a different value for each response you might trigger (setNextTurn, onGameWin, alert Game Over,
  // or alert Space is Taken)
})


// The Catch-all Route
routes.get('/*', function(req, res) {
  res.sendFile(assetFolder + '/client/public/main.html')
})

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));
// Middleware - executes on any client and server interaction
// Marks the request and time on console
app.use(morgan('dev'));
app.use('/', routes);

// Start the server!
var port = process.env.PORT || 8000;
app.listen(port);
console.log("Listening on port", port);
