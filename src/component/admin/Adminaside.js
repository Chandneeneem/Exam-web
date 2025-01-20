import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Adminaside() {
  const navigate = useNavigate();
  const handleLogout = () => {//remove item localstorage
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div>
      <div className='m-2'>
        <i className='bi bi-check2-all me-3 fs-4'></i>
        <span className='brand-name fs-4'>Lests do it</span>
        <h2>Admin Panel</h2>
      </div>
      <hr></hr>
      <Link to='/um' className='list-group-item py-2 my-1'><i className='fs-5 me-3'></i><span className='comptext'>User Data</span></Link>
      <Link to='/admindash' className='list-group-item py-2 my-1'><i className='fs-5 me-3'></i><span className='comptext'>User Result</span></Link>
      <Link to='/aptiadd' className='list-group-item py-2 my-1'><i className='fs-5 me-3'></i><span className='comptext'>Apttitude Question</span></Link>
      <Link to='/verbadd' className='list-group-item py-2 my-1'><i className='fs-5 me-3'> </i><span className='comptext'>Reasoning</span></Link>
      <Link to='/insertcgk' className='list-group-item py-2 my-1'><i className='fs-5 me-3'> </i><span className='comptext'>Current Affairs </span></Link>
      <hr></hr>
      <button><span className='comptext' onClick={handleLogout}>Logout</span></button>
    </div>
  )
}

export default Adminaside
