import React, { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { useHistory } from "react-router";
import "./Game.css";
var icons = require.context("../assets/icons", true);

const Game = props => {
  let path = props.location.pathname.split("/")[2];
  const history = useHistory();
  const [puzzleId, setPuzzleId] = useState(undefined);
  const [puzzleData, setPuzzleData] = useState(undefined);
  const [time, setTime] = useState(60);
  const [gameQuestion, setQuestion] = useState(1);

  const [sendReq, loading, resData] = useHttp();

  useEffect(() => {
    if (path !== undefined && path != "") {
      sendReq("/quizzes/" + path);
    } else {
      history.push("/Puzzles");
    }
  }, [path]);

  useEffect(() => {
    if (loading === false) {
      if (resData !== undefined) {
        setPuzzleData(resData.data);
      }
    }
  }, [loading, resData]);

  return (
    <section className="game">
      <header>
        <h3>Zadanie {gameQuestion}</h3>
        <div className="game__timer">{time}s</div>
      </header>
      {puzzleData !== undefined && (
        <section className="game__question">
          <p>{puzzleData.questions[gameQuestion].question}</p>

          {puzzleData.questions[gameQuestion].answers.map(answer => {
            return (
              <label key={answer}>
                <input type="checkbox" />
                {answer}
              </label>
            );
          })}
        </section>
      )}
      <nav>
        <button>
          <img src={icons("./arrow.png")} alt="" />
          Back
        </button>
        <button>
          <img src={icons("./check.png")} alt="" />
          Check
        </button>
      </nav>
    </section>
  );
};

export default Game;
