
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const navigator = useNavigate();

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            if (values.email === 'examadmin@123.com' && values.password === 'examadmin') {
                // const adminUser = { email: values.email };
                // console.log('Admin login successful', adminUser);
                toast.success('Admin login successfully', {
                    autoClose: 3000,
                });

                localStorage.setItem('role', 'admin'); // Set role as admin
                setTimeout(() => {
                    navigator('/admindash');
                }, 2000);
            } else {
                // User login using API
                const response = await axios.get(`http://localhost:5000/user?email=${values.email}&password=${values.password}`);
                const user = response.data[0];
                if (user) {

                    localStorage.setItem('user', JSON.stringify(user));
                }

                if (user) {
                    // console.log('User login successful', user);
                    toast.success('User login successfully', {
                        autoClose: 3000,
                    });

                    localStorage.setItem('role', 'user'); // Set role as user

                    setTimeout(() => {
                        navigator('/home');
                    }, 2000);
                } else {
                    console.log('Invalid email or password');
                    toast.error('Invalid email or password', {
                        autoClose: 3000,
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
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
            }}
        >
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={handleLogin}
                        >
                            {({ isSubmitting }) => (
                                <Form className="rounded p-4 shadow">
                                    <h1 className='comptext' style={{ textAlign: "center" }}>Login Form</h1>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label comptext">Email</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label comptext ">Password</label>
                                        <Field type="password" name="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    <button type="submit" className="btn btn-dark w-100 mb-3" disabled={isSubmitting}>Login</button>
                                    <div className="text-center">
                                        <p className="mb-0">Don't have an account?</p>
                                        <Link to="/" className="btn btn-link">Sign Up</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <ToastContainer position='top-right' autoClose={3000}></ToastContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;


