import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Adminaside from '../Adminaside';

function Currgkadd() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);


    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Currentques');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const removeQuestion = async (questionId) => {
        try {
            await axios.delete(`http://localhost:5000/Currentques/${questionId}`);

            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };
    return (
        <div>
            <div className='container-fluid bg-secondary min-vh-100'>
                <div className='row'>
                    <div className='col-4  col-md-2 bg-white vh-100 position-fixed'><Adminaside></Adminaside></div>
                    <div className='col-4 col-md-2'></div>
                    <div className='col'>
                        <h1>GK Quetions:</h1>
                        <div>
                            <table className='question-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Question</th>
                                        <th>correctAnswer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map(question => (
                                        <tr key={question.id}>
                                            <td>{question.id}</td>
                                            <td>{question.question}</td>
                                            <td>{question.correctAnswer}</td>
                                            <td><button onClick={() => removeQuestion(question.id)}>Remove</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Link to='/icgk'><button className="btn btn-dark p-2 mt-2" >Add Question</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Currgkadd
