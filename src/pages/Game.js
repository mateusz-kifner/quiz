import React, { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { useHistory } from "react-router";
import Nav from "../components/Nav";
import { Toolbar, Typography, makeStyles } from "@material-ui/core";
import "./Game.css";
var icons = require.context("../assets/icons", true);

const Game = props => {
  let path = props.location.pathname.split("/")[2];
  const history = useHistory();
  const [puzzleId, setPuzzleId] = useState(undefined);
  const [puzzleData, setPuzzleData] = useState(undefined);
  const [time, setTime] = useState(10);
  const [gameQuestion, setQuestion] = useState(1);

  const [sendReq, loading, resData] = useHttp();

  useEffect(() => {
    if (path !== undefined && path !== "") {
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

  useEffect(() => {
    var timerID = setInterval(() => {
      setTime(time => {
        if (time < 0) {
          checkHandler();
        } else return time - 1;
      });
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const checkHandler = () => {
    setQuestion(question => {
      return question + 1;
    });
    setTime(time => 60);
  };
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    icon: {
      height: "100%",
      borderRadius: "50%"
    },
    counter: {
      float: "right"
    }
  }));

  const classes = useStyles();

  return (
    <section className="game">
      <Toolbar className="header">
        <Typography variant="h6" className={classes.title}>
          {puzzleData !== undefined && gameQuestion <= puzzleData.question_count
            ? "Zadanie " + gameQuestion
            : "Wyniki"}
        </Typography>
        <Typography variant="h6" className={classes.counter}>
          {puzzleData !== undefined &&
            gameQuestion <= puzzleData.question_count &&
            time + "s"}
        </Typography>
      </Toolbar>

      {puzzleData !== undefined && gameQuestion <= puzzleData.question_count && (
        <section className="game__question">
          <p>{puzzleData.questions[gameQuestion - 1].question}</p>
          {puzzleData.questions[gameQuestion - 1].answers.map(answer => {
            return (
              <label key={answer}>
                <input type="checkbox" />
                {answer}
              </label>
            );
          })}
        </section>
      )}
      <Nav
        links={[
          {
            to: "/Puzzles",
            name: "Back",
            icon: "./arrow_left.svg"
          },
          {
            onClick: () => {
              checkHandler();
            },
            name: "Check",
            icon: "./ok.svg"
          }
        ]}
      />

      {/* <nav>
        <button
          onClick={() => {
            history.push("/Puzzles");
          }}
        >
          <img src={icons("./arrow_left.svg")} alt="" />
          Back
        </button>
        {puzzleData !== undefined && gameQuestion <= puzzleData.question_count && (
          <button onClick={checkHandler}>
            <img src={icons("./ok.svg")} alt="" />
            Check
          </button>
        )}
      </nav> */}
    </section>
  );
};

export default Game;
