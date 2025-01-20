import React, { useState } from 'react'
import Navi from '../layout/Navi'
import { Link } from 'react-router-dom'

function Home2({ Toggle }) {
    return (
        <>
            <div className='px-3'>
                <Navi Toggle={Toggle}></Navi>
                <hr></hr>
                <h1 style={{ background: "grey" }}>Welcom to Letsdoit!.com</h1>
                <hr ></hr>
                <div className='container-fluid'>
                    <div className='row g-3 my-2 p-2'>
                        <div className='col-md-3'>
                            <div className='p-2 bg-secondary-subtle shadow-sm rounded'>
                                <h3 className='fs-2 text-center'>Apptitude</h3>
                                <div className="card-body">
                                    {/* <h5 className="card-title">General Aptitude</h5> */}
                                    <div className="list-group list-group-flush no-border">
                                        <Link to="/apti" className="list-group-item list-group-item-action">
                                            <i className='bi bi-arrow-right-short fs-5 me-3'></i>Arithmetic Aptitude</Link>
                                        <Link to="/apti" className="list-group-item list-group-item-action">
                                            <i className='bi bi-arrow-right-short fs-5 me-3'></i>Data Interpretation</Link>
                                        <Link to="/apti" className="list-group-item list-group-item-action">
                                            <i className='bi bi-arrow-right-short fs-5 me-3'></i>Online Aptitude Test</Link>
                                        <Link to="/apti" className="list-group-item list-group-item-action">
                                            <i className='bi bi-arrow-right-short fs-5 me-3'></i>Data Interpretation Test</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='p-2 bg-secondary-subtle shadow-sm rounded'>
                                <h3 className='fs-2 text-center'>Verbal and Reasoning</h3>
                                <div className="list-group list-group-flush no-border">
                                    <Link to="/verb" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Verbal Ability</Link>
                                    <Link to="/verb" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Logical Reasoning</Link>
                                    <Link to="/verb" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Verbal Reasoning</Link>
                                    <Link to="/verb" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Non Verbal Reasoning</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='p-2 bg-secondary-subtle shadow-sm rounded'>
                                <h3 className='fs-2 text-center'>Current Affairs & GK</h3>
                                <div className="list-group list-group-flush no-border">
                                    <Link to="/currenta" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Current Affairs</Link>
                                    <Link to="/currenta" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Basic General Knowledge</Link>
                                    <Link to="/currenta" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>General Science</Link>
                                    <Link to="/notfound" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Read more...</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='p-2 bg-secondary-subtle shadow-sm rounded'>
                                <h3 className='fs-2 text-center'>Puzzles</h3>
                                <div className="list-group list-group-flush no-border">
                                    <Link to="/notfound" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Number puzzles</Link>
                                    <Link to="/notfound" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Logical puzzles</Link>
                                    <Link to="/puzzel" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Missing letters puzzles</Link>
                                    <Link to="/notfound" className="list-group-item list-group-item-action">
                                        <i className='bi bi-arrow-right-short fs-5 me-3'></i>Read more...</Link>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <hr></hr>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Home2
