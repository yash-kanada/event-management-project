import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'


function AdminLogin() {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const func = async () => {

        const data = { email, password }
        try {
            const res = await axios.post("http://localhost:3046/api/v1/admin/login", data)
            console.log(res)
            if (res.data?.success == true) {
                Cookies.set("accessToken", res.data.accessToken)
                // sessionStorage.setItem("accessToken", res.data.accessToken)
                toast.success(res.data.message)
                navigate('/admin')
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="admin-bg d-flex justify-content-center align-items-center min-vh-100" >
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 p-4 rounded">
                <h2 className="mb-4 text-center">Admin Log In</h2>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control text-bg-dark" id="admin_email" placeholder="Email" required onChange={(e) => setemail(e.target.value)} />
                    <label htmlFor="admin_email" className="text-light">Email</label>
                </div>

                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control text-bg-dark"
                        id="admin_pw"
                        placeholder="Password"
                        required
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <label htmlFor="admin_pw" className="text-light">Password</label>
                    <i
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>

                <div className="mb-3">
                    <button className="fw-semibold btn btn-light py-2 px-3 w-100" id="login-btn" onClick={func} >
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
                    </button>
                </div>

                <div className='d-flex align-items-center justify-content-end w-100 '>
                    <p className='crsptr h-50 mb-0 me-2 fw-medium' onClick={() => navigate('/admin/register')}>Register New Admin  </p>
                </div>

            </div>
        </div>

    )
}

export default AdminLogin
