import React from 'react'
import Adminaside from './Adminaside';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../../App.css';

function Admindash() {
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/result');
                setTestResults(response.data);
            } catch (error) {
                console.error('Error fetching test results:', error);
            }
        };

        fetchTestResults();
    }, []);

    return (
        <>
            <div className='container-fluid bg-secondary min-vh-100'>
                <div className='row'>
                    <div className='col-4  col-md-2 bg-white vh-100 position-fixed'><Adminaside></Adminaside></div>
                    <div className='col-4 col-md-2'></div>
                    <div className='col'>
                        <div>
                            <h1>Test Results Of User..........</h1>
                            <table className='question-table'>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>testType</th>
                                        <th>Score</th>
                                        <th>OutOf</th>
                                        <th>Percentage</th>
                                        <th>Fass/Fail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.userId}</td>
                                            <td>{result.testType}</td>
                                            <td>{result.correctAnswers}</td>
                                            <td>{result.totalnum}</td>
                                            <td>{result.percentage}</td>
                                            <td>{result.passORfail ? 'Passed' : 'Failed'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admindash
