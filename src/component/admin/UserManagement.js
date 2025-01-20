import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Adminaside from './Adminaside';

function UserManagement() {
    const [User, setUser] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching User:', error);
        }
    };

    return (
        <div>
            <div className='container-fluid bg-secondary min-vh-100'>
                <div className='row'>
                    <div className='col-4  col-md-2 bg-white vh-100 position-fixed'><Adminaside></Adminaside></div>
                    <div className='col-4 col-md-2'></div>
                    <div className='col'>
                        <h1>User Data</h1>
                        <div>
                            <table className='question-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {User.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement
