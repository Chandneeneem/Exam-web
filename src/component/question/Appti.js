
import React, { useState, useEffect } from 'react';

import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';


function Appti({ Toggle }) {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [result, setResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60); // Timer set to 1 minute
    const [timerStopped, setTimerStopped] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0); // Track number of attempted questions

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(storedUser)
            setLoggedInUser(parsedUser);
        }
    }, []);

    // Function to fetch quiz questions from API
    const fetchQuestions = async () => {
        try {
            // Make API call to fetch questions
            const response = await axios.get('http://localhost:5000/questionData');
            setQuestions(response.data); // Set fetched questions
            setAnswers(Array(response.data.length).fill(null)); // Initialize answers array
            setTimeLeft(response.data.length * 60)
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // Function to handle selecting an answer
    const handleAnswerChange = (e) => {
        const selectedIndex = parseInt(e.target.value);
        setAnswers([...answers.slice(0, currentIndex), selectedIndex]);
        setAttemptedQuestions(attemptedQuestions + 1); // Increment attempted questions count
    };

    const handleSubmit = async () => {

        let score = 0;
        answers.forEach((answerIndex, index) => {
            const correctIndex = questions[index].options.indexOf(questions[index].correctAnswer);
            if (answerIndex === correctIndex) {
                score++;
            }
        });
        const percentage = (score / questions.length) * 100;
        const passThreshold = 70;
        const isPassed = percentage >= passThreshold;
        const resultData = {
            userId: loggedInUser.name,
            testType: 'Aptitude',
            correctAnswers: score,
            totalnum: questions.length,
            percentage: percentage,
            passORfail: isPassed
        };
        // Post result to API endpoint
        try {
            await axios.post('http://localhost:5000/result', resultData);
            setResult(`Your score: ${score}/${questions.length}. Percentage: ${percentage}%. ${isPassed ? 'Pass' : 'Fail'}`);
        } catch (error) {
            console.error('Error posting test result:', error);
            setResult('An error occurred while saving the test result.');
        }
        setTimerStopped(true); // Stop the timer
    };

    // Function to handle moving to the next question
    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleSubmit();
        }
    };

    // Function to handle moving to the previous question
    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Timer function
    useEffect(() => {
        const timer = setInterval(() => {
            if (!timerStopped) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        // Auto submit when time runs out
        if (timeLeft === 0) {
            handleSubmit();
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timeLeft, timerStopped])

    // Fetch questions on component mount
    useEffect(() => {
        fetchQuestions(); // Call the function to fetch questions
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className='px-3'>
            <hr></hr>
            <h1 style={{ background: "grey" }}>Welcome to Letsdoit!.com</h1>
            <hr ></hr>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title mb-4">Quiz</h1>
                                {!result && (
                                    // <div className="time-left-circle position-absolute top-0 end-0 bg-dark text-white d-flex justify-content-center align-items-center">
                                    //     ...{timeLeft}
                                    // </div>
                                    <div className="time-left-circle position-absolute top-0 end-0 bg-dark text-white d-flex justify-content-center align-items-center">
                                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds} {/* Display remaining time */}
                                    </div>
                                )}
                                {result ? (
                                    <div>
                                        <h3>{result}</h3>
                                        <Link to="/home"><button className="btn btn-dark m-2">Back to Home</button></Link>
                                        <Link to="/home"><button className="btn btn-dark m-2">Retake</button></Link>

                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="card-text">Question {currentIndex + 1}</h3>
                                        <p className="card-text">{questions[currentIndex]?.question}</p>
                                        <div className="form-check">
                                            {questions[currentIndex]?.options.map((option, index) => (
                                                <div key={index}>
                                                    <input className="form-check-input" type="radio" name="answer" id={`option${index}`} value={index} onChange={handleAnswerChange} checked={answers[currentIndex] === index} />
                                                    <label className="form-check-label" htmlFor={`option${index}`}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-dark me-2" onClick={prevQuestion} disabled={currentIndex === 0}>Previous</button>
                                            <button className="btn btn-dark me-2" onClick={nextQuestion}>Next</button>
                                            <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appti;

