var Tictactoe = React.createClass({

  getInitialState: function() {
    var n = 'img/tile.jpg';
    return {
      spaces: [
        n, n, n,
        n, n, n,
        n, n, n
      ],
      player1: 'img/x.jpg',
      player2: 'img/o.jpg',
      currentPlayer: 'Player 1',
      gameOver: false
    }
  },

  setNextTurn: function() {
    if (this.state.currentPlayer === 'Player 1') {
      this.setState({ currentPlayer: 'Player 2' });
    } else {
      this.setState({ currentPlayer: 'Player 1' });
    }
  },

  onGameWin: function(winner) {
    alert(winner + ' won the game!');
  },

  updateSpace: function(index) {
    var newSpaces = this.state.spaces;
    if (this.state.currentPlayer === 'Player 1') {
      newSpaces[index] = this.state.player1;
    } else {
      newSpaces[index] = this.state.player2;
    }
    this.setState({spaces: newSpaces});
    $.ajax({
      url: 'pick',
      type: 'POST',
      dataType: 'text',
      data: { board: newSpaces, index: index, playedBy: newSpaces[index] },
      success: function(res) {
        if (res === 'Accepted') {
          this.onGameWin(this.state.currentPlayer);
          this.setState({gameOver: true});
        } else if (res === undefined) {
          alert('The game is a draw');
        } else { 
          this.setNextTurn();
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('pick', status, err.toString());
      }.bind(this)
    });      
  },

  render: function() {
    var spaces = this.state.spaces;
    var size = this.state.spaces.length;
    var player1 = this.state.player1;
    var player2 = this.state.player2;
    var currentPlayer = this.state.currentPlayer;
    var gameOver = this.state.gameOver;
    var updateSpace = this.updateSpace;
    var board = this.state.spaces.map(function(box, index) {
      // In the map function, 'this' refers to the global scope (non-strict mode) so we have to sneak in 'this'
      var boxes = [];
      boxes.push(<Squares box = {box}
                          index={index} 
                          size={size} 
                          spaces={spaces}
                          player1={player1}
                          player2={player2}
                          currentPlayer={currentPlayer}
                          gameOver={gameOver}
                          updateSpace={updateSpace} 
                          />);
      return (
        boxes
      )
    });
    return (
      <div id='board' >
        <h2>Welcome to ReacTicTacToe</h2>
        <h3>It's {this.state.currentPlayer}'s turn.</h3>
        {board}
      </div>
    )
  }
});

var Squares = React.createClass({

  selectBox: function() {
    var spaces = this.props.spaces;
    var index = this.props.index;
    var player1 = this.props.player1;
    var player2 = this.props.player2;
    var gameOver = this.props.gameOver;
    var updateSpace = this.props.updateSpace;
    if (spaces[index] !== player1 && spaces[index] !== player2 && gameOver !== true) {
      updateSpace(index);
    } else if (gameOver === true) {
      alert('Game over, refresh the page for a new game');
    } else {
      alert('This space is already taken');
    }
  },

  render: function() {
    // Each dimension of the board should be the square root of the overall size
    if (this.props.index % Math.sqrt(this.props.size) !== 0) {
      return (
        <img src={this.props.box} className='space' onClick={this.selectBox} />
      )
    } else {
    // This will start a new line based on the n-dimension of the board
      return (
        <img src={this.props.box} className='space' onClick={this.selectBox} style={{clear: 'left'}} />
      )
    }
  }
});


ReactDOM.render((
  <Tictactoe />
),
document.getElementById('app'));
