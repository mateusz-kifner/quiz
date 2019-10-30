import React, { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { useHistory } from "react-router";
import Nav from "../components/Nav";
import { Toolbar, Typography, makeStyles } from "@material-ui/core";
import "./Game.css";
import Question from "../components/Question";

var icons = require.context("../assets/icons", true);

const Game = props => {
  let path = props.location.pathname.split("/")[2];
  const history = useHistory();
  const [puzzleId, setPuzzleId] = useState(undefined);
  const [puzzleData, setPuzzleData] = useState(undefined);
  const [gameData, setGameData] = useState(undefined);
  const [time, setTime] = useState(10);
  const [init, setInit] = useState(0);
  const [newQuestion, setNewQuestion] = useState(false);

  const [userAnswer, setUserAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [gameQuestion, setGameQuestion] = useState(1);

  const [score, setScore] = useState([]);
  const [scoreMax, setScoreMax] = useState([]);

  const [overallScore, setOverallScore] = useState([]);

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
        if (init == 0) {
          setPuzzleData(resData.data);
          setInit(1);
          sendReq("/game/" + path);
        }
        if (init == 1) {
          setGameData(resData.data);
          setScore(() => {
            const len = resData.data.game_time_limit_questions.length;
            let a = [];
            for (let i = 0; i < len; i++) a.push(0);
            return a;
          });
          setScoreMax(() => {
            const len = resData.data.game_time_limit_questions.length;
            let a = [];
            for (let i = 0; i < len; i++) a.push(0);
            return a;
          });
          setAnswer(() => {
            const len = resData.data.game_time_limit_questions.length;
            let a = [];
            for (let i = 0; i < len; i++) a.push(0);
            return a;
          });
          setUserAnswer(() => {
            const len = resData.data.game_time_limit_questions.length;
            let a = [];
            for (let i = 0; i < len; i++) a.push(0);
            return a;
          });
          setNewQuestion(true);
          setInit(2);
        }
        if (init == 2) {
          if (resData.data.next_question === null) {
            setInit(5);
          }
          setAnswer(state => {
            state[resData.data.next_question - 1] = resData.data.answer;
            console.log(state);
            return state;
          });
          setOverallScore(resData.data.overall_score);
          setScore(state => {
            state[resData.data.next_question - 1] = resData.data.score;
            console.log(state);
            return state;
          });
          setScoreMax(state => {
            state[resData.data.next_question - 1] = resData.data.max_score;
            console.log(state);
            return state;
          });
          setUserAnswer(() => {
            const len = gameData.game_time_limit_questions.length;
            let a = [];
            for (let i = 0; i < len; i++) a.push(0);
            return a;
          });
        }
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

    return () => {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    if (newQuestion) {
      setNewQuestion(false);
      setTime(gameData.game_time_limit_questions[gameQuestion - 1]);
      setUserAnswer(() => {
        let a = [];
        let len = JSON.parse(puzzleData.questions)[gameQuestion - 1].answers
          .length;
        for (let b = 0; b < len; b++) a.push(false);
        return a;
      });
    }
  }, [newQuestion]);

  const checkHandler = () => {
    setGameQuestion(question => {
      return question + 1;
    });
    sendReq("/game/submit", {
      answer: userAnswer
        .map((val, index) => {
          return val ? index : -1;
        })
        .filter(val => {
          return val !== -1;
        })
    });
    if (gameQuestion > puzzleData.question_count) setNewQuestion(true);
  };

  const changeHandler = (checked, index) => {
    setUserAnswer(state => {
      let new_state = [...state];
      new_state[index] = checked;
      return new_state;
    });
    console.log(userAnswer);
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
  let puzzleData_questions;
  if (typeof puzzleData !== "undefined")
    puzzleData_questions = JSON.parse(puzzleData.questions)[gameQuestion - 1];

  let end_screen = [];
  let links = {};
  if (
    typeof puzzleData !== "undefined" &&
    gameQuestion - 1 > puzzleData.question_count
  ) {
    for (let i = 0; i < puzzleData.question_count; i++) {
      end_screen.push(
        <div>
          {score[i]} / {scoreMax[i]}
        </div>
      );
    }
    links = [
      {
        to: "/Puzzles",
        name: "Back",
        icon: "./arrow_left.svg"
      }
    ];
  } else {
    links = [
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
    ];
  }

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

      {puzzleData_questions !== undefined &&
        gameQuestion <= puzzleData.question_count && (
          <Question
            question={puzzleData_questions.question}
            answers={puzzleData_questions.answers}
            userAnswer={userAnswer}
            change={changeHandler}
          />
        )}
      {typeof puzzleData !== "undefined" &&
        !(gameQuestion <= puzzleData.question_count) && (
          <section>
            {end_screen}
            <div style={{ marginLeft: "2rem" }}>
              {overallScore} / {scoreMax.reduce((a, b) => a + b, 1)}
            </div>
          </section>
        )}
      <Nav links={links} />
    </section>
  );
};

export default Game;
