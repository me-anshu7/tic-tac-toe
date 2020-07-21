import React from 'react';
import Board from './components/Board';
import './App.css';

var ctr;
class App extends React.Component {

  state = {
    player1: 'Player 1',
    player2: 'Player 2',
    squares: Array(9).fill(null),
    xIsNext: true,
    isGameOn: false,
    disabled: false,
    timerArr: []
  }

  handleName = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (i) => {
    let { timerArr } = this.state;

    if (!this.state.isGameOn) {
      return;
    }
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    if (this.state.xIsNext) {
      if (timerArr.length > 0) clearInterval(timerArr[timerArr.length - 1]);
      squares[i] = 'X';
      document.querySelector('.name1').style.color = 'black';
      document.querySelector('.name2').style.color = 'lightgreen';
      // this.timerFunction('t1', 5);
      ctr = 5;
      let intervalID = setInterval(this.timerCounter, 1000, 't2');
      timerArr.push(intervalID);

    } else {
      if (timerArr.length > 0) clearInterval(timerArr[timerArr.length - 1]);
      squares[i] = 'O';
      document.querySelector('.name2').style.color = 'black';
      document.querySelector('.name1').style.color = 'lightgreen';
      // this.timerFunction('t2', 5);
      ctr = 5;
      let intervalID = setInterval(this.timerCounter, 1000, 't1');
      timerArr.push(intervalID);

    }
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      timerArr: timerArr
    });
  }

  handleStart = () => {
    let { squares, xIsNext, isGameOn, player1, player2 } = this.state;
    if (isGameOn) {
      document.querySelector('.name1').style.color = 'black';
      document.querySelector('.name2').style.color = 'black';

      player1 = 'Player 1';
      player2 = 'Player 2';
      squares = Array(9).fill(null).slice();
      xIsNext = true;
      isGameOn = false;
      this.setState({
        player1: player1,
        player2: player2,
        squares: squares,
        xIsNext: xIsNext,
        isGameOn: isGameOn,
        disabled: true
      });
    }
    document.querySelector('.name1').style.color = 'lightgreen';
    console.log('HandleStart');
    ctr = 5;
    let intervalID = setInterval(this.timerCounter, 1000, 't1');
    this.state.timerArr.push(intervalID);
    this.setState({
      isGameOn: true,
      timerArr: this.state.timerArr
    })
  }

  /* timerFunction = (id, x) => {
    console.log('#id', id)
    let intervalID = setInterval((id, x, intervalID) => {
      if (x <= 0) {
        clearInterval(intervalID);
        return;
      }
      console.log(x);
      document.getElementById(id).innerHTML = x--;
      this.timerFunction(id, x);
    }, 1000, id, x, intervalID);
    
  } */

  timerCounter = (id, x) => {
    document.getElementById(id).innerHTML = ctr--;
    if (ctr <= 0) {
      // alert(`Timeout: ${this.state['player' + id.slice(1, 2)]} lost!`);
      return;
    }
    return
  }

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] === 'X' ? this.state.player1 : this.state.player2;
      }
    }
    return null;
  }

  render() {
    console.log(this.state);

    return (
      <div className="game" >
        <div>
          <input
            type='text' name='player1'
            value={this.state.player1} className='text-filed name1'
            onChange={e => this.handleName(e)} disabled={this.state.disabled} />
          <button
            className='start-btn'
            onClick={this.handleStart}>Start</button>
          <input
            type='text' name='player2'
            value={this.state.player2} className='text-filed name2'
            onChange={e => this.handleName(e)} disabled={this.state.disabled} />
        </div>

        <br /><br />

        <div className="game-board">
          <label>Timer</label><div className='timer-circle'><p id="t1"></p></div>
          <Board player1={this.state.player1} player2={this.state.player2} handleClick={this.handleClick} squares={this.state.squares} xIsNext={this.state.xIsNext} calculateWinner={this.calculateWinner} />
          <div className='timer-circle'><p id="t2"></p></div><label>Timer</label>
        </div>
      </div>
    );
  }
}

export default App;
