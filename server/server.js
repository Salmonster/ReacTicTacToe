var express = require('express');
var Path = require('path');
var morgan = require('morgan');
var app = express();
var routes = express.Router();

var assetFolder = Path.resolve(__dirname, '../client');
routes.use(express.static(assetFolder));


routes.post('/pick', function(req, res) {
  // Supports NxN game board
  console.log("Req.body in server: ", req.body);
  var player1 = 'img/x.jpg', player2 = 'img/o.jpg', unplayed = 'img/tile.jpg', index = Number(req.body.index),
      board = req.body.board, dimension = Math.sqrt(req.body.board.length), size = req.body.board.length;
  // Create a method on Array.prototype to help check for winning plays
  Array.prototype.allValuesSame = function() {
    for (var i = 1; i < this.length; i++) {
      if (this[i] !== this[0] || this[i] === unplayed) {
        return false;
      }
    }
    return true;
  };
  // Check for horizontal wins
  var y = 0;
  while (y < size) {
    var rowEnd = y + dimension;
    var row = board.slice(y, rowEnd);
    if (row.allValuesSame()) {
      return res.sendStatus(202);
    }
    y += dimension;
  }
  // Check for vertical wins
  var x = 0;
  while (x < dimension) {
    var column = [];
    for (var i = x; i < size; i += dimension) {
      column.push(board[i]);
    }
    if (column.allValuesSame()) {
      return res.sendStatus(202);
    }
    x++;
  }
  // Check for diagonal wins
  var d = 0, diagonal = [];
  while (d < size) {
    diagonal.push(board[d]);
    d += dimension + 1;
  }
  if (diagonal.allValuesSame()) {
    return res.sendStatus(202);
  }
  // Check for antidiagonal wins
  var ad = dimension - 1, antidiagonal = [];
  while (ad < size - 1) {
    antidiagonal.push(board[ad]);
    ad += dimension - 1;
  }
  if (antidiagonal.allValuesSame()) {
    return res.sendStatus(202);
  }
  if (board.indexOf(unplayed) === -1) {
    return res.sendStatus(204);
  }
  res.sendStatus(200);
});

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));
// Middleware that executes on any client/server interaction, marking request and time in console
app.use(morgan('dev'));
app.use('/', routes);

// Start the server
var port = process.env.PORT || 8000;
app.listen(port);
console.log("Listening on port", port);
