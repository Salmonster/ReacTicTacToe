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
  // or alert Space is Taken) -- SHOULD SUPPORT NxN GAME BOARD
  var checkForWinner = function () {
    // Because (NaN === NaN) is always false, we can safely assume
    // that if three spaces in a row are the same, all three spaces are
    // marked by a player, and not all empty.
    if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
      || spaces[3] === spaces[4] && spaces[4] === spaces[5]
      || spaces[6] === spaces[7] && spaces[7] === spaces[8]
      // TODO: Check for rest of game winning cases
    )
    {
      // TODO: Handle game winner
      // alert('Somebody won!');
      // onGameWin(currentPlayer);
      // gameStatus = true;
    }
  };
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
