import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Sidebar from '../component/let/Sidebar'
import Home2 from '../component/Home2'

function Home() {
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className='container-fluid bg-secondary min-vh-100'>
            <div className='row'>
                {toggle && <div className='col-4  col-md-2 bg-white vh-100 position-fixed'>
                    <Sidebar></Sidebar>
                </div>}
                {toggle && <div className='col-4 col-md-2'></div>}
                <div className='col'>
                    <Home2 Toggle={Toggle}></Home2>
                </div>
            </div>
        </div>
    )
}

export default Home
