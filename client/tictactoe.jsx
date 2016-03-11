/* 
Render the tictactoe array in the following layout. Use states instead of or tied to 
array indices.

<h3>It's <span id='turn-label'></span>'s turn</h3>

<div id='board'>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
  <div class='space'></div>
</div>
*/

var Tictactoe = React.createClass({

  // State changes would work in place of jQuery class changes.

  getInitialState: function() {
    // Using NaN instead of null is a clever hack. See checkForWinner in server for details.
    return {
      spaces: [
        NaN, NaN, NaN,
        NaN, NaN, NaN,
        NaN, NaN, NaN
      ],
      player1: 'Player1',
      player2: 'Player2',
      currentPlayer: null,
      gameStatus: false
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

  // TODO: Handle state changes on click, use control flow to alter view accordingly
  selectBox: function() {
    console.log('Box selected... which one?', this);
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

  onGameWin: function(winner) {
    // TODO: Alert who won the game
    $('body').append('<p>Congrats ' + winner + ', you win!</p>');
  },

  render: function() {
    var size = this.state.spaces.length;
    var board = this.state.spaces.map(function(box, index) {
      var boxes = [];
      if (index % Math.sqrt(size) !== 0) {
        boxes.push(<div className='space' key={index} />);
      } else {
        // This will start a new line based on the n-dimension of the board
        boxes.push(<div className='space' key={index} style={{clear: 'left'}} />);
      }
      return (
        boxes
      );
    });
    return (
      <div id='board' onClick={this.selectBox} >
        {board}
      </div>
    );
  }
});


ReactDOM.render((
  <Tictactoe />
),
document.getElementById('app'));
