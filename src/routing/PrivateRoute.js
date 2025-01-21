import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAdmin }) => {
    const role = localStorage.getItem('role');

    if (isAdmin && role !== 'admin') { return <Navigate to="/" /> }

    if (!role) { return <Navigate to="/" /> } 

    return element;
};

export default PrivateRoute;




