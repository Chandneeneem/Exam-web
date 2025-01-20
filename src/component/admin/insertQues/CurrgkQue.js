
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

const CurrgkQue = () => {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
    const nevigate = useNavigate();
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const newOptions = [...formData.options];
            newOptions[index] = value;
            setFormData({
                ...formData,
                options: newOptions
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    const addQuestion = async () => {
        // Check if all fields are filled
        if (!formData.question || formData.options.some(option => option === '') || !formData.correctAnswer) {
            toast.error('Please fill all fields.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/Currentques', formData);
            toast.success('Added successfully', {
                autoClose: 3000,
            });

            setTimeout(() => {
                nevigate('/insertcgk');
            }, 2000);
        } catch (error) {
            console.error('Error adding question:', error);
            toast.error('Error adding question. Please try again.', {
                autoClose: 3000,
            });

        }
    };

    return (
        <div>
            <Container>
                <Card>
                    <Card.Body>
                        <h2>Add Question</h2>
                        <Form>
                            <Form.Group controlId="question" className="mb-3">
                                <Form.Label>Question</Form.Label>
                                <Form.Control type="text" name="question" value={formData.question} onChange={handleChange} placeholder="Enter question" />
                            </Form.Group>
                            <Form.Group controlId="options">
                                <Form.Label>Options</Form.Label>
                                {formData.options.map((option, index) => (
                                    <Form.Control key={index} type="text" name="options" value={option} onChange={(e) => handleChange(e, index)} placeholder={`Option ${index + 1}`} className="mb-2" />
                                ))}
                            </Form.Group>
                            <Form.Group controlId="correctAnswer" className="mb-3">
                                <Form.Label>Correct Answer</Form.Label>
                                {formData.options.map((option, index) => (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        name="correctAnswer"
                                        id={`option${index}`}
                                        value={option}
                                        onChange={handleChange}
                                        label={`Option ${index + 1}`}
                                        className="mb-2"
                                    />
                                ))}
                            </Form.Group>
                            <Button variant="dark p-2 m-3" onClick={addQuestion}>Add Question</Button>
                            <Link to='/admindash'><Button variant="dark p-2 m-3">Back</Button></Link>
                        </Form>
                    </Card.Body>
                </Card>
                <ToastContainer position='top-right' autoClose={3000}></ToastContainer>
            </Container>

        </div>
    );
};

export default CurrgkQue;

