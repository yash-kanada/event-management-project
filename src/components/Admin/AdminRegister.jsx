import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function AdminRegister() {

    const [fullName, setfullName] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const func = async () => {

        const data = { fullName, email, password }

        try {
            const res = await axios.post("http://localhost:3046/api/v1/admin/register", data)
            console.log(res)
            if (res.data?.success == true) {
                // sessionStorage.setItem("adminToken",res.data.accessToken)
                Cookies.set("accessToken", res.data.accessToken)
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
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 shadow-lg p-4 rounded">
                <h2 className="mb-4 text-center">Admin Register</h2>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control text-bg-dark" id="admin_name" placeholder="Name" required onChange={(e) => setfullName(e.target.value)} />
                    <label htmlFor="admin_name" className="text-light">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control text-bg-dark" id="admin_email" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                    <label htmlFor="admin_email" className="text-light">Email</label>
                </div>

                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control text-bg-dark"
                        id="admin_pw"
                        placeholder="Password"
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <label htmlFor="admin_pw" className="text-light">Password</label>
                    <i
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>

                <div className="mb-2">
                    <button className="fw-semibold btn btn-light py-2 px-3 w-100" id="login-btn" onClick={func}>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            Register
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
            </div>
        </div>

    )
}

export default AdminRegister
