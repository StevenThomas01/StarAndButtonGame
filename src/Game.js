import React, { Component } from "react";

const Stars = props => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  let stars = [];
  for (let index = 0; index < numberOfStars; index++) {
    // Rule: Pushes value into array
    stars.push(<li key={index} className="fa fa-star" />);
  }

  // Rule: React auto deals with stars array
  return <div className="col-5">{stars}</div>;
};

const Button = props => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = props => {
  return <div className="col-5">...</div>;
};

const Numbers = props => {
  return (
    <div className="card text-centre">
      <div>
        <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>
      </div>
    </div>
  );
};

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
