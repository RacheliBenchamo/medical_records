import React, { useState } from 'react';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Header({ onGameReset }) {
    const [showRules, setShowRules] = useState(false);

    // This function toggles the rules section
    const handleToggleRules = () => {
        setShowRules(!showRules);
    };

    return (
        <header className="header">
            <div className="container">
                <img src="/images/background.png"/>
                <div className="header-buttons">
                    <button className="btn my-button m-3" onClick={onGameReset}>NEW GAME</button>
                    <button className="btn my-button m-3" onClick={handleToggleRules}>
                        {showRules ? 'HIDE RULES' : 'SHOW RULES'}
                    </button>
                </div>
            </div>
            {showRules && (
                <div className="game-rules">
                    <p><b>Welcome to the Bulls and Cows game!</b></p>
                    <p>The objective of the game is to correctly guess a 4-digit number that the computer has chosen. Each digit in the number is unique, and the number cannot begin with a 0.</p>
                    <p>To make a guess, enter a 4-digit number in the input field and click "Guess". The computer will then give you feedback in the form of "bulls" and "cows".</p>
                    <p><b>A "bull" </b>means that you have guessed a digit correctly and it is in the correct position.</p>
                    <p><b>A "cow" </b>means that you have guessed a digit correctly, but it is in the wrong position.</p>
                    <p>For example, if the computer's number is 1234 and you guess 1356, the computer will respond with "1 bull, 1 cow".</p>
                    <p>This means that you have correctly guessed the digit "1" and it is in the correct position (the "bull"), and you have correctly guessed the digit "3", but it is in the wrong position (the "cow").</p>
                </div>
            )}
        </header>
    );
}

export default Header;

