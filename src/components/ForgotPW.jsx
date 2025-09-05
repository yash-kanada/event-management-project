import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ForgotPW() {

    const [mobile_no, setmobile_no] = useState()
    const [otp, setotp] = useState()
    const [user_id, setUser_id] = useState()
    const [password, setPassword] = useState()
    const [conf_password, setconf_password] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [show, setShow] = useState(false)
    const [btnDis, setbtnDis] = useState(false)
    const navigate = useNavigate()

    const sendOTP = async () => {
        const data = { mobile_no }
        try {
            setbtnDis(true)
            const res = await axios.post("http://localhost:3046/api/v1/users/sendotp", data)
            if (res.data?.success == true) {
                toast.success(res.data.message, { autoClose: 1200 })
                setShow(true)
            } else {
                toast.error(res.data.message, { autoClose: 1200 })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1200 })
        } finally {
            setbtnDis(false)
        }
    }

    const verifyOTP = async () => {
        const data = { mobile_no, otp }
        try {
            setbtnDis(true)
            const res = await axios.post("http://localhost:3046/api/v1/users/verifyotp", data)
            if (res.data?.success) {
                toast.success(res.data.message, { autoClose: 1200 })
                setmobile_no('')
                setotp('')
                setPassword('')
                setconf_password('')
                setUser_id(res.data.id)
            } else {
                toast.error(res.data.message, { autoClose: 1200 })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1200 })
        } finally {
            setbtnDis(false)
        }
    }

    const changePw = async () => {
        const data = { id: user_id, password }
        if (password == conf_password) {
            try {
                setbtnDis(true)
                const res = await axios.post("http://localhost:3046/api/v1/users/forgotpassword", data)
                if (res.data?.success == true) {
                    toast.success(res.data.message, { autoClose: 1200 })
                    navigate('/login')
                } else {
                    toast.error(res.data.message, { autoClose: 1200 })
                }
            } catch (error) {
                toast.error(error.message, { autoClose: 1200 })
            } finally {
                setbtnDis(false)
            }
        } else {
            toast.warning("Passwords doesn't match")
        }
    }

    if (user_id) {
        return (
            <>
                <Header />

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                        <h2 className="text-center mb-4">Forgot Password</h2>

                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control text-bg-light border-dark pe-5"
                                id="user_pw"
                                placeholder="New Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="user_pw">New Password</label>
                            <i
                                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showPassword1 ? 'text' : 'password'}
                                className="form-control text-bg-light border-dark"
                                id="user_confpw"
                                placeholder="Confirm Password"
                                onChange={(e) => setconf_password(e.target.value)}
                                required
                            />
                            <label htmlFor="user_confpw" >Confirm Password</label>
                            <i
                                className={`bi ${showPassword1 ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                                onClick={() => setShowPassword1(!showPassword1)}
                            ></i>
                        </div>

                        <button className="btn btn-dark w-100 fw-semibold" onClick={changePw}>
                            {btnDis ? (
                                <>
                                    Changing...
                                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </>
                            ) : (
                                "Change"
                            )}
                        </button>

                    </div>
                </div>

                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />

            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-4">Forgot Password</h2>

                    <div className="form-floating mb-3">
                        <input type="tel" className="form-control text-bg-light border-dark" id="user_phone" placeholder="Phone No" value={mobile_no || ''} onChange={(e) => setmobile_no(e.target.value)} required />
                        <label htmlFor="user_phone" >Phone No</label>
                    </div>

                    {show && (
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control text-bg-light border-dark" id="user_otp" placeholder="OTP" required onChange={(e) => setotp(e.target.value)} />
                            <label htmlFor="user_phone" >OTP</label>
                        </div>
                    )}

                    {show ? (
                        <button className="btn btn-dark w-100 fw-semibold" onClick={verifyOTP}>
                            {btnDis ? (
                                <>
                                    Verifying...
                                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                    ) : (
                        <button className="btn btn-dark w-100 fw-semibold" disabled={btnDis} onClick={sendOTP} >
                            {btnDis ? (
                                <>
                                    Sending...
                                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    )}

                </div>
            </div>

            <Footer />
        </>
    )
}

export default ForgotPW


