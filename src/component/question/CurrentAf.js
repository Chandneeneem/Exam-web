
import React, { useState, useEffect } from 'react';

import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';

function Current({ Toggle }) {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [result, setResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerStopped, setTimerStopped] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setLoggedInUser(parsedUser);
        }
    }, []);

    const fetchQuestions = async () => {
        try {
            // Make API call to fetch questions
            const response = await axios.get('http://localhost:5000/Currentques');
            setQuestions(response.data); // Set fetched questions
            setAnswers(Array(response.data.length).fill(null)); // Initialize answers array
            setTimeLeft(response.data.length * 60)
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerChange = (e) => {
        // Extract the index of the selected answer from the event object
        // Update the answers array:
        // - Copy existing answers up to the current question index
        // - Replace the answer at the current question index with the newly selected answer index
        const selectedIndex = parseInt(e.target.value);//parseInt convert string to interger 
        setAnswers([...answers.slice(0, currentIndex), selectedIndex]);
        setAttemptedQuestions(attemptedQuestions + 1); // Increment attempted questions count
    };


    // const handleSubmit = () => {
    //     // Calculate score
    //     let score = 0;
    //     let correctAnswers = [];
    //     let incorrectAnswers = [];

    //     answers.forEach((answerIndex, index) => {
    //         const correctIndex = questions[index].options.indexOf(questions[index].correctAnswer);
    //         if (answerIndex === correctIndex) {
    //             score++;
    //             correctAnswers.push(index + 1);
    //         } else {
    //             incorrectAnswers.push(index + 1);
    //         }
    //     });

    //     // Calculate time taken
    //     const timeTaken = 60 - timeLeft;

    //     // Set result message
    //     if (attemptedQuestions < passingLimit) {
    //         setResult(`You answered less than ${passingLimit} questions. Please retake the exam.`);
    //     } else {
    //         setResult(`Your score: ${score}/${questions.length}. Time taken: ${timeTaken} seconds. Correct answers: ${correctAnswers.join(', ')}. Incorrect answers: ${incorrectAnswers.join(', ')}.`);
    //     }
    //     setTimerStopped(true); // Stop the timer
    // };

    // const handleSubmit = async () => {
    //     // Calculate score
    //     let score = 0;
    //     let correctAnswers = [];
    //     let incorrectAnswers = [];

    //     answers.forEach((answerIndex, index) => {
    //         const correctIndex = questions[index].options.indexOf(questions[index].correctAnswer);
    //         if (answerIndex === correctIndex) {
    //             score++;
    //             correctAnswers.push(index + 1);
    //         } else {
    //             incorrectAnswers.push(index + 1);
    //         }
    //     });

    //     // Calculate time taken
    //     const timeTaken = 60 - timeLeft;

    //     // Set result message
    //     let resultMessage;
    //     if (attemptedQuestions < passingLimit) {
    //         resultMessage = `You answered less than ${passingLimit} questions. Please retake the exam.`;
    //     } else {
    //         resultMessage = `Your score: ${score}/${questions.length}. Time taken: ${timeTaken} seconds. Correct answers: ${correctAnswers.join(', ')}. Incorrect answers: ${incorrectAnswers.join(', ')}.`;
    //     }

    //     // Post result to API endpoint
    //     try {
    //         await axios.post('http://localhost:5000/result', {
    //             score,
    //             totalQuestions: questions.length,
    //             timeTaken,
    //             correctAnswers,
    //             incorrectAnswers
    //         });
    //     } catch (error) {
    //         console.error('Error posting test result:', error);
    //     }

    //     setResult(resultMessage);
    //     setTimerStopped(true); // Stop the timer
    // };

    // const handleSubmit = async () => {
    //     // Calculate score
    //     let score = 0;
    //     answers.forEach((answerIndex, index) => {
    //         const correctIndex = questions[index].options.indexOf(questions[index].correctAnswer);
    //         if (answerIndex === correctIndex) {
    //             score++;
    //         }
    //     });

    //     // Prepare data to be sent
    //     const resultData = {
    //         userId: loggedInUser.name, // Replace 'user_id_here' with the actual user ID
    //         testType: 'current_affairs', // Replace 'current_affairs' with the actual test type
    //         correctAnswers: score,
    //         totalnum: questions.length
    //     };

    //     // Post result to API endpoint
    //     try {
    //         await axios.post('http://localhost:5000/result', resultData);
    //         setResult(`Your score: ${score}/${questions.length}.`);
    //     } catch (error) {
    //         console.error('Error posting test result:', error);
    //         setResult('An error occurred while saving the test result.');
    //     }

    //     setTimerStopped(true); // Stop the timer
    // };
    const handleSubmit = async () => {
        // Calculate score
        let score = 0;
        answers.forEach((answerIndex, index) => {
            const correctIndex = questions[index].options.indexOf(questions[index].correctAnswer);
            if (answerIndex === correctIndex) {
                score++;
            }
        });

        // Calculate percentage
        const percentage = (score / questions.length) * 100;

        // Determine pass or fail
        const passThreshold = 70; // Set the pass threshold percentage
        const isPassed = percentage >= passThreshold;

        // Prepare data to be sent
        const resultData = {
            userId: loggedInUser.name, // Replace 'user_id_here' with the actual user ID
            testType: 'current_affairs', // Replace 'current_affairs' with the actual test type
            correctAnswers: score,
            totalnum: questions.length,
            percentage: percentage,
            passORfail: isPassed
        };

        // Post result to API endpoint
        try {
            await axios.post('http://localhost:5000/result', resultData);
            setResult(`Your score: ${score}/${questions.length}. Percentage: ${percentage}%. ${isPassed ? 'Pass' : 'Fail'}.`);
        } catch (error) {
            console.error('Error posting test result:', error);
            setResult('An error occurred while saving the test result.');
        }

        setTimerStopped(true); // Stop the timer
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

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
    }, [timeLeft, timerStopped]);

    useEffect(() => {
        fetchQuestions();
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

export default Current;
