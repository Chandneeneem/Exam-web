import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div>
      <div className="container">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <h3><Link to='/home' >Back to Home</Link></h3>
      </div>
    </div>
  )
}

export default Notfound;