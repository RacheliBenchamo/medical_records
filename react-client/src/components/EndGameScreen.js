import React, { useState } from 'react';
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

function EndGameScreen({ score }) {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState('');

    // This function handles the response from the server
    function handleResponse(response) {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(`${data.error}`);
            });
        }
        return response.json();
    }

    // This function handles the JSON response from the server
    function handleJson(jsonObj) {
        const scoresArray = Object.entries(jsonObj.result).map(([name, score]) => ({ name, score }));
        const sortedScores = scoresArray.sort((a, b) => a.score - b.score);
        setHighScores(sortedScores);
    }

    // This function handles any errors from the server
    function handleError(error) {
        setError(error.message.toString());
    }

    // This function handles the form submission
    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        handleFormSubmissionPost();
    }

    // This function handles the POST request to the server
    function handleFormSubmissionPost() {

        let params = {
            name: name.toLowerCase().trim(),
            score: score
        };
        fetch("/api/highscores",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(params).toString()
        })
            .then(handleResponse)
            .then(handleJson)
            .catch(handleError);
    }

    return (
        <div className="EndGameScreen">
            <h1 className="font2">YOU WON!</h1>
            <h2 className="font2">your score is: {score}</h2>
            {!submitted && (
                <form onSubmit={handleSubmit}>
                    <div className="font1 mb-3">
                        <div className="form-group font">
                            <label htmlFor="name">Enter your name:</label>
                            <input
                                type="text"
                                className="form-control mb-3 mt-2"
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                maxLength={20}
                                onChange={(event) => setName(event.target.value)}
                                pattern="^\s*[a-zA-Z0-9]+$"
                                title="Name must contain letters and numbers only"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success mb-3">
                        Save score
                    </button>
                </form>
            )}
            {submitted && (
                <>
                {error ? (
                    <div className="text-danger">{error}</div>
                ) : (
                    <>
                    <p className="text-bg-success">Score saved!</p>
                    <h3 className="font3">High Scores</h3>
                    <table className="table table-hover table-light text-success">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {highScores.map((highScore, index) => (
                            <tr key={index}>
                                <td>{highScore.name}</td>
                                <td>{highScore.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </>
                )}
                </>
            )}
        </div>
    );
}

export default EndGameScreen;
