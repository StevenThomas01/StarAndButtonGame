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
  return (
    <div className="col-2">
      {/* // Rule: React determines display disabled text in html */}
      <button className="btn" disabled={props.selectedNumbers.length === 0}>
        =
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

Numbers.list = _.range(1, 10);

class Game extends Component {
  state = {
    selectedNumbers: [2, 4],
    numberOfStars: 1 + Math.floor(Math.random() * 9)
  };

  SelectNumber = clickedNumber => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) return;

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  RemoveNumber = clickedNumber => {
    // Rule: to change state have to still use the { selectedNumbers: ...} object
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    }));
  };

  render() {
    // Rule: transfer state to separate constants.
    const { selectedNumbers, numberOfStars } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer
            RemoveNumber={this.RemoveNumber}
            selectedNumbers={selectedNumbers}
          />
        </div>
        <br />
        <Numbers
          // Rule: this.SelectNumber is a function
          SelectNumber={this.SelectNumber}
          // Rule: selectedNumbers is a const from this.state.selectedNumbers
          selectedNumbers={selectedNumbers}
        />
      </div>
    );
  }
}

export default Game;
