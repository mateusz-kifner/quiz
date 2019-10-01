import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/useHttp";

import VerticalButton from "../components/VerticalButton";

import "./Puzzles.css";

const Puzzles = props => {
    const [currentPuzzle, setCurrentPuzzle] = useState({
        puzzleId: "",
        puzzleData: {}
    });
    const [puzzleList, setPuzzleList] = useState([]);

    const auth = useContext(AuthContext);

    const [sendReq, loading, resData] = useHttp();

    useEffect(() => {
        console.log("send res effect");
        if (currentPuzzle.puzzleId !== "") {
            console.log("send res id");
            sendReq("/Quizzes/" + currentPuzzle.puzzleId);
        } else {
            console.log("send res quizzes");
            sendReq("/Quizzes");
        }
    });

    useEffect(() => {
        console.log("loding res effect");

        if (loading === false) {
            console.log(resData);
        }
    }, [loading]);

    let path = props.location.pathname.split("/")[2];
    return (
        <div className="puzzles">
            {puzzleList.map(item => (
                <VerticalButton
                    icon={item.icon}
                    title={item.title}
                    onClick={e => {
                        currentPuzzle.puzzleId = item._id;
                    }}
                />
            ))}
        </div>
    );
};

export default Puzzles;
