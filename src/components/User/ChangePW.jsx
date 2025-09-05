import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function ChangePw() {

  const [userPW, setuserPW] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate()

  const changePW = async () => {
    const data = { password: userPW.currentPW, newPassword: userPW.newPW }
    try {
      setbtnDis(true)
      const res = await axios.post("http://localhost:3046/api/v1/users/passwordChange", data, {
        withCredentials: true,
      })
      if (res.data?.success) {
        toast.success(res.data.message, { autoClose: 1200 })
        navigate('/login')
        window.location.reload()
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setbtnDis(false)
    }
  }

  return (
    <>
      <Header />

      <div className="account-page blur-overlay flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="contact-overlay"></div>

        <form action="#" className="col-12 col-sm-10 col-md-8 col-lg-5 shadow-lg p-4 rounded bg-dark bg-opacity-75" style={{ zIndex: "2" }}>
          <h2 className="mb-4 text-center">Change Password</h2>

          <div className="form-floating mb-3 position-relative ">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control text-bg-dark"
              id="user_pw"
              placeholder="Current Password"
              required
              onChange={(e) => setuserPW({ ...userPW, currentPW: e.target.value })}
            />
            <label htmlFor="user_pw" className="text-light">Current Password</label>
            <i
              className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="form-floating mb-3 position-relative ">
            <input
              type={showPassword1 ? 'text' : 'password'}
              className="form-control text-bg-dark"
              id="user_newpw"
              placeholder="New Password"
              required
              onChange={(e) => setuserPW({ ...userPW, newPW: e.target.value })}
            />
            <label htmlFor="user_newpw" className="text-light">New Password</label>
            <i
              className={`bi ${showPassword1 ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
              onClick={() => setShowPassword1(!showPassword1)}
            ></i>
          </div>

          <div className="mb-2">
            <button type="submit" className="fw-semibold btn btn-light py-2 px-3 w-100" id="change-btn" disabled={btnDis} onClick={changePW}>
              {btnDis ? (
                <>
                  Changing...
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-3" >
                  Change
                  <lord-icon
                    src="https://cdn.lordicon.com/fikcyfpp.json"
                    trigger="hover"
                    stroke="bold"
                    target="#change-btn"
                    colors="primary:#000000,secondary:#000000"
                    style={{ width: "30px", height: "30px" }}
                  >
                  </lord-icon>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer className="mb-0" />
    </>
  )
}

export default ChangePw
