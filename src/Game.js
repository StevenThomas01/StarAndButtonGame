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
        <button className="btn btn-success">
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

  return <div className="col-2">{button}</div>;
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
  // Rule: if have const in function/obj then can create Number.list,
  // where list (or any name you want) is a property
  //const arrayOfNumbers = _.range(1, 10);

  const numberClassName = number => {
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

// Rule: Numbers is a function/object. Numbers.list dynamically create "list" property to store value.
Numbers.list = _.range(1, 10);

class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null
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
          />
          <Answer
            RemoveNumber={this.RemoveNumber}
            selectedNumbers={this.state.selectedNumbers}
          />
        </div>
        <br />
        <Numbers
          // Rule: this.SelectNumber is a function
          SelectNumber={this.SelectNumber}
          selectedNumbers={this.state.selectedNumbers}
        />
      </div>
    );
  }
}

export default Game;
