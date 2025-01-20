import React, { useEffect, useState } from 'react'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import { LuUserCircle } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

function Nav({ Toggle }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigator = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setLoggedInUser(null);
    navigator('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
        <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success btn-dark" type="submit">Search</button>
        </form>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              {loggedInUser && (
                <spam className="nav-link  p-2" href="#" role="button">

                  <LuUserCircle /> <strong> {loggedInUser.name}</strong>
                </spam>)}
            </li>
            <button><span className='comptext' onClick={handleLogout}>Logout</span></button>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Nav

