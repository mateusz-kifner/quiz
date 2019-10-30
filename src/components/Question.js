import React from "react";

const Question = props => {
  return (
    <section className="game__question">
      <p>{props.question}</p>
      {props.answers.map((answer, index) => {
        return (
          <label key={answer}>
            <input
              type="checkbox"
              onChange={e => props.change(e.target.checked, index)}
              checked={props.userAnswer[index]}
            />
            {answer}
          </label>
        );
      })}
    </section>
  );
};

export default Question;
