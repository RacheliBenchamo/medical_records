import React, {useState} from 'react';

function GameScreen({ onGameEnd }) {
    const [targetNumber] = useState(generateRandomNumber);
    const [inputs, setInputs] = useState({});
    const [guessHistory, setGuessHistory] = useState([]);
    const [message, setMessage] = useState('Your history of guesses will appear below:');

    //This function generate a random 4-digit number
    function generateRandomNumber() {
        const digits = [];
        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 10);
            if (!digits.includes(digit)) {
                digits.push(digit);
            }
        }
        console.log('targetNumber', digits.join(''));
        return digits.join('');
    }

    //This function check if the number has repetition
    function checkNumberRepetition(guess) {
        const digits = guess.split('');
        const uniqueDigits = new Set(digits);
        return uniqueDigits.size === 4;
    }

    //This function check the number of bulls and cows
    const bullsCowsCounter = (inputs) => {
        let bulls = 0;
        let cows = 0;
        let guess = inputs.guess;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === targetNumber[i]) {
                bulls++;
            } else if (targetNumber.includes(guess[i])) {
                cows++;
            }
        }
        if (bulls === 4) {
            onGameEnd(guessHistory.length + 1);
        }

        setMessage('Your guess was : ' + guess + ' - ' + bulls + ' Bulls, ' + cows + ' Cows');
        return `${inputs.guess}, ${bulls}, ${cows}`;
    };

    //This function handle the change of the input fields
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    //This function handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        const guess =
            (inputs.digit1 || '') +
            (inputs.digit2 || '') +
            (inputs.digit3 || '') +
            (inputs.digit4 || '');
        if (guess.length !== 4) {
            setMessage('Please enter a 4 digit number.');
            return;
        }
        if(!checkNumberRepetition(guess)){
            setMessage('Please enter a 4 digit number without repetition.');
            return;
        }
        let currentGuess = guessHistory;
        const guessResult = bullsCowsCounter({ guess });
        currentGuess.unshift(guessResult);
        setGuessHistory(currentGuess);
        setInputs({ digit1: '', digit2: '', digit3: '', digit4: '' }); // reset the input fields
    };


    return (
        <div className="GameScreen">
            <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center m-1">
                    {[1, 2, 3, 4].map((digit) => (
                        <select
                            key={digit}
                            name={`digit${digit}`}
                            value={inputs[`digit${digit}`] || 'Guess...'}
                            onChange={handleChange}
                            className="form-control select me-2"
                        >
                            <option disabled hidden>Guess...</option>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button className="btn btn-success m-1" type="submit">Guess</button>
                    {message && <div className="massage mb-2">{message}</div>}
                </div>
                {guessHistory.length > 0 ? (
                    <table className="table table-hover table-light text-success">
                        <thead>
                        <tr>
                            <th scope="col">Guess</th>
                            <th scope="col">Bulls</th>
                            <th scope="col">Cows</th>
                        </tr>
                        </thead>
                        <tbody>
                        {guessHistory.map((guess, index) => {
                            const [currentGuess, bulls, cows] = guess.split(', ');
                            return (
                                <tr key={index}>
                                    <td>{currentGuess}</td>
                                    <td>{bulls}</td>
                                    <td>{cows}</td>
                                </tr>
                            );
                        })}
                        </tbody>

                    </table>
                ) : (
                    ''
                )}
            </form>
        </div>
    );
}

export default GameScreen;
