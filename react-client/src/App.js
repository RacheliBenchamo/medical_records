import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import GameScreen from './components/GameScreen';
import EndGameScreen from './components/EndGameScreen';
import Header from './components/Header';


function App() {
    const [gameState, setGameState] = useState('playing');
    const [score, setScore] = useState(0);

    // this function handles the end of the game
    const handleGameEnd = (score) => {
        setGameState('ended');
        setScore(score);
    };

    // this function handles the reset of the game
    const handleResetGame = () => {
        if(gameState === 'playing')
            setGameState('reset');
        else
            setGameState('playing');
        setScore(0);
    };

    return (
        <div className="App">
            <div>
                <Header onGameReset={handleResetGame} />
            </div>
            <div className="footer">
                {gameState === 'playing' && (
                    <div>
                        <GameScreen
                            onGameEnd={handleGameEnd}
                        />
                    </div>
                )}
                {gameState === 'ended' && <EndGameScreen score={score} />}
                {gameState === 'reset' && (
                    <div>
                        <GameScreen
                            onGameEnd={handleGameEnd}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
