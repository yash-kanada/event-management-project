import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useState } from 'react'

function Login() {

  const [mobile_no, setmobile_no] = useState()
  const [password, setpassword] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate()

  const func = async () => {
    const data = { mobile_no, password };
    try {
      setbtnDis(true)
      const res = await axios.post("http://localhost:3046/api/v1/users/login", data);
      console.log(res);
      if (res.data?.success == true) {
        Cookies.set("accessToken", res.data.accessToken);
        toast.success(res.data.message, { autoClose: 1000 });
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      btnDis(false)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="login-page d-flex justify-content-center align-items-center flex-grow-1">
        <div className="contact-overlay"></div>
        <div className="col-12 col-sm-10 col-md-6 col-lg-4 bg-dark bg-opacity-75 text-white p-4 rounded shadow-lg" style={{ zIndex: "2" }}>
          <h2 className="mb-4 text-center">Log In</h2>

          <div className="form-floating mb-3">
            <input type="tel" className="form-control text-bg-dark" id="user_phone" placeholder="Phone No" required onChange={(e) => setmobile_no(e.target.value)} />
            <label htmlFor="user_phone" className="text-light">Phone No</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control text-bg-dark"
              id="user_pw"
              placeholder="Password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <label htmlFor="user_pw" className="text-light">Password</label>
            <i
              className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="mb-3">
            <button className="fw-semibold btn btn-light py-2 px-3 w-100" id="login-btn" disabled={btnDis} onClick={func}>
              {btnDis ? (
                <>
                  Log in...
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-3">
                  Log In
                  <lord-icon
                    src="https://cdn.lordicon.com/whtfgdfm.json"
                    trigger="hover"
                    target="#login-btn"
                    colors="primary:#000000"
                    style={{ width: "30px", height: "30px" }}>
                  </lord-icon>
                </div>
              )}
            </button>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <p className="mb-0 crsptr" onClick={() => navigate("/forgot-password")} >Forget password?</p>
            <p className='mb-0 crsptr' onClick={() => navigate('/signup')}>Don't have an account? Sign Up</p>
          </div>
        </div>
      </div >

      <Footer className="mb-0" />
    </div >
  )
}

export default Login
