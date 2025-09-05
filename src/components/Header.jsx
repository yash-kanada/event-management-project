import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

function Header() {

    const [user, setUser] = useState()
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setloading(true)
                const res = await axios.get("http://localhost:3046/api/v1/users/getcurrentUser", {
                    withCredentials: true,
                })
                console.log("from header : ", res.data.data)
                setUser(res.data.data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }
        fetchUser()
    }, [])


    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-lg-0 custom-navbar" >
                <div className="container-fluid">
                    <p className="navbar-brand text-white d-flex align-items-center hdrP" onClick={() => navigate('/')}>
                        <i className="d-inline-block align-text-top me-2 ">
                            <lord-icon
                                src="https://cdn.lordicon.com/lovvjejj.json"
                                trigger="hover"
                                stroke="bold"
                                style={{ width: "40px", height: "40px" }}>
                            </lord-icon>
                        </i>
                        The Event Box
                    </p>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 text- text-lg-center nav-underline">
                            <li className="nav-item">
                                <p
                                    className={`nav-link hdrP ${location.pathname === '/' ? 'active text-white' : 'text-white'}`}
                                    onClick={() => navigate('/')}>Home
                                </p>
                            </li>
                            <li className="nav-item">
                                <p
                                    className={`nav-link hdrP ${location.pathname === '/about' ? 'active text-white' : 'text-white'}`}
                                    onClick={() => navigate('/about')}>About
                                </p>
                            </li>
                            <li className="nav-item ">
                                <p
                                    className={`nav-link hdrP ${location.pathname === '/plantrip' ? 'active text-white' : 'text-white'}`}
                                    onClick={() => navigate('/events-all-cat')}>Event</p>
                            </li>
                            <li className="nav-item">
                                <p
                                    className={`nav-link hdrP ${location.pathname === '/gallary' ? 'active text-white' : 'text-white'}`}
                                    onClick={() => navigate('/gallary')}>Gallary
                                </p>
                            </li>
                            <li className="nav-item">
                                <p
                                    className={`nav-link hdrP ${location.pathname === '/contactus' ? 'active text-white' : 'text-white'}`}
                                    onClick={() => navigate('/contactus')}>Contact Us
                                </p>
                            </li>
                        </ul>

                        {loading ? (
                            <div className="d-flex align-items-center" role="status">
                                <div className="spinner-border text-light spinner-border-sm me-2" />
                            </div>
                        ) : user ? (
                            <div className='d-flex align-items-center justify-content-start ms-lg-3 crsptr' onClick={() => navigate('/account')}>
                                <img src={user.avatar} alt="" className='rounded-circle m-1 object-fit-cover' height={35} width={35} />
                                <p className='m-0 ms-1'>User</p>
                            </div>
                        ) : (
                            <div className="d-flex  justify-content-lg-end mt-2 mt-lg-0" >
                                <button type="button" className="btn btn-outline-light" onClick={() => navigate('/login')} >Log In</button>
                            </div>
                        )}

                    </div>

                </div>
            </nav >

        </>


    )
}

export default Header
