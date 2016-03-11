var Tictactoe = React.createClass({

  getInitialState: function() {
    // Using NaN instead of null is a clever hack. See checkForWinner in server for details.
    return {
      spaces: [
        NaN, NaN, NaN,
        NaN, NaN, NaN,
        NaN, NaN, NaN
      ],
      player1: 'Player 1',
      player2: 'Player 2',
      currentPlayer: 'Player 1',
      gameStatus: false,
      selectBox: this.selectBox
    }
  },

  setNextTurn: function() {
    if (this.state.currentPlayer === this.state.player1) {
      this.setState({ currentPlayer: this.state.player2 });
    } else {
      this.setState({ currentPlayer: this.state.player1 });
    }
    // TODO: changing the state of currentPlayer should trigger a view re-render
    //       make sure the rendered box (element) has selectBox as onChange handler
    $('#turn-label').text(currentPlayer);
  },

  onGameWin: function(winner) {
    // TODO: Alert who won the game
    $('body').append('<p>Congrats ' + winner + ', you win!</p>');
  },

  render: function() {
    var size = this.state.spaces.length;

    var board = this.state.spaces.map(function(box, index) {
      // In the map function, we're in the global scope
      var boxes = [];
      boxes.push(<Squares boxKey={index} size={size} />);
      return (
        boxes
      );
    });
    return (
      <div id='board' >
        <h2>Welcome to ReacTicTacToe</h2>
        <h3>It's {this.state.currentPlayer}'s turn.</h3>
        {board}
      </div>
    );
  }
});

var Squares = React.createClass({

  // TODO: Handle state changes on click, use control flow to alter view accordingly
  selectBox: function() {
    console.log('Box selected... which one?', this.props.boxKey);
  },
  // $(document).on('click', '#board .space', function (e) {
  //   var spaceNum = $(e.currentTarget).index();
  //   console.log('You clicked on space #' + spaceNum);
  //   if(spaces[spaceNum] !== player1 && spaces[spaceNum] !== player2 && gameStatus !== true) {
  //   // Marks the space with the current player's name
  //   $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
  //   spaces[spaceNum] = currentPlayer;
  //   checkForWinner();
  //   setNextTurn();
  //   } else if (gameStatus === true) {
  //     alert('Game over');
  //   } else {
  //     alert('This space is already taken');
  //   }
  // });

  render: function() {
    // Each dimension of the board should be the square root of the overall size
    if (this.props.boxKey % Math.sqrt(this.props.size) !== 0) {
      return (
        <div className='space' onClick={this.selectBox} />
      )
    } else {
    // This will start a new line based on the n-dimension of the board
      return (
        <div className='space' onClick={this.selectBox} style={{clear: 'left'}} />
      )
    }
  }
})


ReactDOM.render((
  <Tictactoe />
),
document.getElementById('app'));
