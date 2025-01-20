import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAdmin }) => {
    const role = localStorage.getItem('role'); // If adminOnly is true and role is not admin, nevigate to login

    if (isAdmin && role !== 'admin') { return <Navigate to="/" /> }// If user is not logged in, redirect to login

    if (!role) { return <Navigate to="/" /> }  // User is logged in, return the element

    return element;
};

export default PrivateRoute;




