import React, { Component } from "react";
import Axios from "axios";
import AuthContext from "../context/AuthContext";

import "./Puzzles.css";

var icons = require.context("../assets/icons", true);

class Puzzles extends Component {
    state = {
        puzzle_data: [],
        currentPuzzle: null,
        currentPuzzleData: {}
    };

    static contextType = AuthContext;

    componentDidMount() {
        this.update();
    }

    update() {
        Axios.get(this.context.host + "/quizzes/")
            .then(res => {
                this.setState({ puzzle_data: res.data });
            })
            .catch(err => {
                this.context.token = null;
                setTimeout(() => {
                    this.props.history.push("/Auth");
                });
            });
    }

    getPuzzle() {
        console.log({
            headers: {
                Authorization: "Bearer " + this.context.token
            }
        });
        Axios.get(this.context.host + "/quizzes/" + this.state.currentPuzzle, {
            headers: {
                Authorization: "Bearer " + this.context.token
            }
        })
            .then(res => {
                this.setState({
                    currentPuzzle: res.data._id,
                    currentPuzzleData: res.data
                });
                setTimeout(() => {
                    this.props.history.push("/Puzzles/" + res.data._id);
                });
                // data = Object.assing({}, res.data);
            })
            .catch(err => {
                if (err.response.data.error.message === "Auth failed") {
                    this.context.token = null;
                    setTimeout(() => {
                        this.props.history.push("/Auth");
                    });
                }
                this.setState({ currentPuzzle: null });
            });
    }

    render() {
        let path = this.props.location.pathname.split("/")[2];
        return (
            <div className="puzzles">
                {this.state.currentPuzzle === null &&
                    this.state.puzzle_data.map(item => (
                        <article
                            className="puzzle-preview"
                            key={item._id}
                            onClick={() => {
                                this.setState({ currentPuzzle: item._id });
                                setTimeout(() => {
                                    this.getPuzzle();
                                });
                            }}
                        >
                            <img
                                src={
                                    item.icon !== undefined
                                        ? icons("./" + item.icon)
                                        : icons("./Puzzle_white.png")
                                }
                                alt=""
                            />
                            <div className="puzzle-preview__container">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </article>
                    ))}
                {path !== "" && (
                    <article className="puzzle">
                        <img
                            src={
                                this.state.currentPuzzleData.icon !== undefined
                                    ? icons(
                                          "./" +
                                              this.state.currentPuzzleData.icon
                                      )
                                    : icons("./Puzzle_white.png")
                            }
                            alt=""
                        />
                        <div className="puzzle-preview__container">
                            <h4>{this.state.currentPuzzleData.title}</h4>
                            <p>{this.state.currentPuzzleData.description}</p>
                        </div>
                    </article>
                )}
            </div>
        );
    }
}

export default Puzzles;
