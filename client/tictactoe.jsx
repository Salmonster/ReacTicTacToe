// var React = require('react');
// var ReactDOM = require('react-dom');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');

/* 
Render the tictactoe array in the following layout. Use states instead of or tied to 
array indices. LinkedStateMixin would probably work in place of jQuery class changes.

<h3>It's <span id="turn-label"></span>'s turn</h3>

<div id="board">
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>
</div>

*/

var Tictactoe = React.createClass({
  render: function() {
    return (
      <h1>Testing</h1>
    );
  }
});


ReactDOM.render((
  <Tictactoe />
),
document.getElementById('app'));
