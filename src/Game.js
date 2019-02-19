import React, { Component } from "react";
import _ from "lodash";

const Stars = props => {
  //   let stars = [];
  //   for (let index = 0; index < numberOfStars; index++) {
  //     // Rule: Pushes value into array
  //     stars.push(<li key={index} className="fa fa-star" />);
  //   }

  // Rule: React auto deals with stars array
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i => (
        //   key is not displayed in html. Required by React
        <li key={i} className="fa fa-star" />
      ))}
    </div>
  );
};

const Button = props => {
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button
          className="btn btn-success"
          onClick={() => props.acceptAnswer()}
        >
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
        </button>
      );
      break;
    default:
      button = (
        <button
          onClick={() => props.checkAnswer()}
          className="btn"
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );
      break;
  }

  return (
    <div className="col-2 text-centre">
      {button}
      <br />
      <br />
      <button
        className="btn btn-warning btn-sm"
        onClick={props.redraw}
        disabled={props.refreshAttempt === -1}
      >
        <i className="fa fa-refresh">
          refresh: {props.refreshAttempt === -1 ? 0 : props.refreshAttempt}
        </i>
      </button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => (
        <span onClick={() => props.RemoveNumber(number)} key={i}>
          {number}
        </span>
      ))}
    </div>
  );
};

const Numbers = props => {
  // Rule: numberClassName is function/object is called when rendering 1 to 9 numbers.
  // Style is driven by usedNumbers and selectedNumbers state.
  const numberClassName = number => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }

    //   Rule: search within array
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  };

  return (
    <div className="card text-centre">
      <div>
        {/* Rule: => () is function call. => {} produces error!!! */}
        {Numbers.list.map((number, i) => (
          <span
            onClick={() => {
              props.SelectNumber(number);
            }}
            key={i}
            className={numberClassName(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

const DoneFrame = props => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button onClick={props.PlayAgain}>Play Again</button>
    </div>
  );
};

// Rule: Numbers is a function/object. Numbers.list dynamically create "list" property to store value.
Numbers.list = _.range(1, 10);

class Game extends Component {
  // Rule: Must be called as a function to work.
  // Why can't be used as a static value?
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);

  InitialiseState = () => ({
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    refreshAttempt: 5,
    doneStatus: null
  });

  state = this.InitialiseState();

  PlayAgain = () => {
    this.setState(this.InitialiseState());
  };

  SelectNumber = clickedNumber => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) return;

    this.setState(prevState => ({
      answerIsCorrect: null, // Rule: we're inside state object
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  RemoveNumber = clickedNumber => {
    // Rule: to change state have to still use the { selectedNumbers: ...} object
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    }));
  };

  checkAnswer = () => {
    let sumSelectedNumbers = 0;
    // Rule: reduce, map and filter are inbuilt functions
    sumSelectedNumbers = this.state.selectedNumbers.reduce(
      (total, number) => total + number
    );

    if (this.state.numberOfStars === sumSelectedNumbers) {
      this.setState(() => ({ answerIsCorrect: true }));
      // console.log("true");
    } else {
      this.setState(() => ({ answerIsCorrect: false }));
      // console.log("false");
    }
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),

        // Rule: reseting states, and when page re-submitted, have new number of stars, and
        // restart of 1 to 9 numbers, but used numbers remain green/selected.

        selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null
      }),
      // Rule: Second parameter is a callback function pointer
      this.updateDoneStatus
    );
  };

  redraw = () => {
    if (this.state.refreshAttempt <= -1) return;

    this.setState(
      prevState => ({
        selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        refreshAttempt: prevState.refreshAttempt - 1
      }),
      this.updateDoneStatus
    );
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "You Win." };
      }

      // Qs. Why previous state same as current state?
      if (prevState.refreshAttempt === -1) {
        return { doneStatus: "Game Over!" };
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={this.state.numberOfStars} />
          <Button
            selectedNumbers={this.state.selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={this.state.answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            refreshAttempt={this.state.refreshAttempt}
          />
          <Answer
            RemoveNumber={this.RemoveNumber}
            selectedNumbers={this.state.selectedNumbers}
          />
        </div>
        <br />
        {this.state.doneStatus !== null ? (
          <DoneFrame
            PlayAgain={this.PlayAgain}
            doneStatus={this.state.doneStatus}
          />
        ) : (
          <Numbers
            // Rule: this.SelectNumber is a function
            SelectNumber={this.SelectNumber}
            selectedNumbers={this.state.selectedNumbers}
            usedNumbers={this.state.usedNumbers}
          />
        )}
      </div>
    );
  }
}

export default Game;
