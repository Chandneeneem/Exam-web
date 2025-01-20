import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormLabel, FormControl, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'


const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const Register = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {

        setPasswordVisible(!passwordVisible);
    };
    const toggleconfirmPassword = () => {
        setConfirmPassword(!confirmPassword);
        console.log(confirmPassword)
    }

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await axios.post('http://localhost:5000/user', values);
            // console.log('Signup successful');
            toast.success('Admin login successfully', {
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            resetForm();
        } catch (error) {
            console.error('Signup failed:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/000/575/893/original/white-and-gray-color-polygon-abstract-background-technology-modern-vector-illustration.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'cover'

                }}
            >
                <Container className="bg-image" fluid>
                    <Row className="justify-content-center align-items-center vh-100">
                        <Col md={6}>
                            <div className="form-box p-4 ">
                                <Formik
                                    initialValues={{ name: '', email: '', password: '', confirmPassword: '', acceptTerms: false }}
                                    validationSchema={SignupSchema}
                                    onSubmit={handleFormSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="rounded p-5 shadow ">
                                            <h1 style={{ textAlign: 'center', fontWeight: "bold" }}>RegisterPage</h1>
                                            <FormGroup>
                                                <FormLabel className='comptext' htmlFor="name">
                                                    <strong>Name</strong>
                                                </FormLabel>
                                                <Field type="text" name="name" as={FormControl} />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel className='comptext' htmlFor="email"><strong>Email</strong></FormLabel>
                                                <Field type="email" name="email" as={FormControl} />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel className='comptext' htmlFor="password"><strong>Password</strong></FormLabel>
                                                <div className='input-group'>
                                                    <Field
                                                        type={passwordVisible ? 'text' : 'password'}
                                                        name="password"
                                                        as={FormControl}
                                                    />
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={togglePasswordVisibility}
                                                        className="input-group-append"
                                                    >
                                                        {/* <BiHide /> */}
                                                        <i className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </Button>
                                                </div>
                                                {/* <Field type="password" name="password" as={FormControl} /> */}
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel className='comptext' htmlFor="confirmPassword"><strong>Confirm Password</strong></FormLabel>
                                                <div className="input-group">
                                                    <Field
                                                        type={confirmPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        as={FormControl}
                                                    />
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={toggleconfirmPassword}
                                                        className="input-group-append"
                                                    >
                                                        {/* <BiHide /> */}
                                                        <i className={`bi ${confirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                    </Button>
                                                </div>
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Field type="checkbox" name="acceptTerms" id="acceptTerms" className="form-check-input" />
                                                <FormLabel htmlFor="acceptTerms" className="form-check-label comptext">
                                                    <strong> I accept the</strong> <Link to="#">terms and conditions</Link>
                                                </FormLabel>
                                                <ErrorMessage name="acceptTerms" component="div" className="text-danger" />
                                            </FormGroup>
                                            <Button type="submit" variant="dark" disabled={isSubmitting} className="mt-3 w-100 mb-3">
                                                Sign Up
                                            </Button>
                                            <div className="mt-3">
                                                Already have an account? <Link to="/login">Log in</Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <ToastContainer position='top-right' autoClose={3000}></ToastContainer>
                        </Col>
                    </Row>
                </Container>

            </div>
        </>
    );
};

export default Register;
