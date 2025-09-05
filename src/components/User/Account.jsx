import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Account() {

    const [user, setUser] = useState({})
    const [loading, setloading] = useState(true)
    const [btnDis, setbtnDis] = useState(false)
    const [btnLogoutDis, setbtnLogoutDis] = useState(false)
    const inputFileRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setloading(true)

                const res = await axios.get("http://localhost:3046/api/v1/users/getcurrentUser", {
                    withCredentials: true,
                })
                console.log(res.data.data)
                if (res.data?.success) {
                    setUser(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)

            }
        }
        fetchUser()
    }, [])

    const handleFileClick = () => {
        inputFileRef.current.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append("avatar", file)
        if (file) {
            try {
                setloading(true)
                setbtnDis(true)
                const res = await axios.post("http://localhost:3046/api/v1/users/avatar", formData, {
                    withCredentials: true
                })
                if (res.data?.success == true) {
                    toast.success(res.data.message, { autoClose: 1200 })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
                setbtnDis(false)
            }
        }
    }

    const logout = async () => {
        try {
            setbtnLogoutDis(true)
            const res = await axios.post("http://localhost:3046/api/v1/users/logout", {}, {
                withCredentials: true,
            })
            if (res.data?.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setbtnLogoutDis(false)
        }
    }

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return (
        <>
            <Header />
            <div className="account-page blur-overlay flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="contact-overlay"></div>
                <div className="col-12 col-sm-10 col-md-8 col-lg-5 shadow-lg p-4 rounded d-flex flex-column align-items-center bg-dark bg-opacity-75" style={{ zIndex: "2" }}>


                    <h5 className=" text-center mb-4">My Account</h5>

                    <input type="file" id="user_profile_pic" accept="image/*" hidden ref={inputFileRef} onChange={(e) => handleFileChange(e)} />
                    <div
                        className="position-relative d-inline-block"
                        style={{ height: "60px", width: "60px" }}
                    >
                        <div
                            className="rounded-circle border border-3 bg-secondary-subtle d-flex justify-content-center align-items-center"
                            style={{
                                height: "100%",
                                width: "100%",
                                backgroundColor: "#dee2e6",
                                overflow: "hidden",
                            }}
                        >
                            {loading ? (
                                <span className="placeholder-glow w-100 h-100 d-block rounded-circle bg-secondary"></span>
                            ) : (
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-100 h-100 object-fit-cover"
                                />
                            )}
                        </div>


                        {!loading && (
                            <span
                                onClick={handleFileClick}
                                className="position-absolute bg-light border rounded-circle d-flex justify-content-center align-items-center"
                                style={{
                                    bottom: "0px",
                                    right: "0px",
                                    width: "25px",
                                    height: "25px",
                                    transform: "translate(25%, 25%)",
                                    cursor: "pointer",
                                    zIndex: 1,
                                }}
                            >
                                <button className="border rounded-circle" disabled={btnDis}>
                                    <i className="bi bi-camera-fill text-black" style={{ fontSize: "14px" }}></i>
                                </button>
                            </span>
                        )}
                    </div>




                    {loading ? (
                        <div className="w-100 mt-5">
                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-6 rounded bg-secondary"></span>
                            </div>
                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-8 rounded bg-secondary"></span>
                            </div>
                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-4 rounded bg-secondary"></span>
                            </div>
                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-5 rounded bg-secondary"></span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='d-flex align-items-center justify-content-between w-100 mb-1 mt-5'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <i className="bi bi-person-fill me-2"></i>
                                    <p className='m-0'>{user.fullName}</p>
                                </div>
                                <i className="bi bi-pencil-fill crsptr" onClick={() => navigate('/change-user-detail')}></i>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-100 m-1'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    <p className='m-0'>{user.email}</p>
                                </div>
                                <i className="bi bi-pencil-fill crsptr" onClick={() => navigate('/change-user-detail')}></i>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-100 m-1'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <i className="bi bi-gender-ambiguous me-2"></i>
                                    <p className='m-0'>{user.gender}</p>
                                </div>
                                <i className="bi bi-pencil-fill crsptr" onClick={() => navigate('/change-user-detail')}></i>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-100 m-1'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <p className='m-0'>{user.mobile_no}</p>
                                </div>
                                <i className="bi bi-pencil-fill crsptr" onClick={() => navigate('/change-user-detail')}></i>
                            </div>
                        </>
                    )}


                    <div className="container mt-4">
                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <button className="btn btn-light btn-sm fw-semibold w-100 py-2" onClick={() => navigate('/my-booking')}>My Booking</button>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-light btn-sm fw-semibold w-100 py-2" onClick={() => navigate('/change-user-password')}>Change Password</button>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-light btn-sm fw-semibold w-100 py-2" disabled={btnLogoutDis} onClick={logout}>
                                    {btnLogoutDis ? (
                                        <>
                                            Log Out...
                                            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                        </>
                                    ) : (
                                        "Log Out"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

            <Footer />
        </>
    )
}

export default Account
