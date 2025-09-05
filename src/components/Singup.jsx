import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [fullName, setfullName] = useState()
  const [email, setemail] = useState()
  const [gender, setgender] = useState()
  const [mobile_no, setmobile_no] = useState()
  const [password, setpassword] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate();

  const func = async () => {
    const data = { fullName, email, gender, mobile_no, password }
    try {
      setbtnDis(true)
      const res = await axios.post("http://localhost:3046/api/v1/users/register", data)
      console.log(res)
      if (res.data?.success == true) {
        toast.success(res.data.message, { autoClose: 1000 })
        navigate('/login')
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
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="login-page  flex-grow-1">
        <div className="contact-overlay"></div>
        <div className="d-flex justify-content-center align-items-center mt-5 mt-lg-2" >
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 bg-dark bg-opacity-75 shadow-lg p-4 rounded" style={{ zIndex: "2" }}>
            <h2 className="mb-4 text-center">Sign Up</h2>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control text-bg-dark"
                id="user_name"
                placeholder="Name"
                required
                onChange={(e) => setfullName(e.target.value)}
              />
              <label htmlFor="user_name" className="text-light">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control text-bg-dark"
                id="user_email"
                placeholder="Email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
              <label htmlFor="user_email" className="text-light">Email</label>
            </div>

            <div className='mb-2'>
              <label className='me-2 text-light'>Gender</label>
            </div>
            <div className='mb-3'>
              {["male", "female", "others"].map((g) => (
                <div className="form-check form-check-inline" key={g}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value={g}
                    required
                    id={`${g}`}
                    onChange={(e) => setgender(e.target.value)}
                  />
                  <label htmlFor={`${g}`} className="form-check-label text-light">{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                </div>
              ))}
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control text-bg-dark"
                id="user_phone"
                placeholder="Phone"
                required
                onChange={(e) => setmobile_no(e.target.value)}
              />
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

            <div className="mb-2">
              <button
                className="fw-semibold btn btn-light py-2 px-3 w-100"
                id="signup-btn"
                disabled={btnDis}
                onClick={func}
              >
                {btnDis ? (
                  <>
                    Sing Up...
                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                  </>
                ) : (
                  "Sing Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
