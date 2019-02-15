import React, { Component } from "react";
import _ from "lodash";

const Stars = props => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  //   let stars = [];
  //   for (let index = 0; index < numberOfStars; index++) {
  //     // Rule: Pushes value into array
  //     stars.push(<li key={index} className="fa fa-star" />);
  //   }

  // Rule: React auto deals with stars array
  return (
    <div className="col-5">
      {_.range(numberOfStars).map(i => (
        //   key is not displayed in html. Required by React
        <li key={i} className="fa fa-star" />
      ))}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      <span>5</span>
      <span>6</span>
    </div>
  );
};

const Numbers = props => {
  // Rule: if have const in function/obj then can create Number.list,
  // where list (or any name you want) is a property
  //const arrayOfNumbers = _.range(1, 10);

  return (
    <div className="card text-centre">
      <div>
        {/* Rule: => () is function call. => {} produces error!!! */}
        {Numbers.list.map((number, i) => (
          <span key={i}>{number}</span>
        ))}
      </div>
    </div>
  );
};

Numbers.list = _.range(1, 10);

class Game extends Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
      </div>
    );
  }
}

export default Game;
