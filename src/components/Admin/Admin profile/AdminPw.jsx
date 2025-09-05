import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSlidebar from '../AdminSlidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminPw() {
  const navigate = useNavigate();

  const [Admin, setAdmin] = useState({})
  const [AdminPW, setAdminPW] = useState({
    password: '',
    newPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [loading, setloading] = useState(true)
  const [btnDis, setbtnDis] = useState(false)

  useEffect(() => {

    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3046/api/v1/admin/getcurrentAdmin", {
          withCredentials: true,
        })
        console.log(res.data)
        setloading(true)
        if (res.data?.success == true) {
          setAdmin(res.data.data)
          // toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setloading(false)
      }
    }
    fetchAdmin()
  }, [])

  const updatePw = async () => {
    const data = { password: AdminPW.password, newPassword: AdminPW.newPassword }
    try {
      const res = await axios.post("http://localhost:3046/api/v1/admin/passwordChange", data, {
        withCredentials: true,
      })
      setbtnDis(true)
      if (res.data?.success == true) {
        toast.success(res.data.message, { autoClose: 1500 })
        setTimeout(() => {
          window.location.reload()
        }, 1500);
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
    <div className="container-fluid">
      <div className="row min-vh-100">

        <div className="col-12 col-lg-3 mb-4 mb-lg-0">
          <AdminSlidebar />
        </div>


        <div className="col-12 col-lg-9 py-5 px-3 d-flex flex-column align-items-center">


          <div className="d-flex align-items-center justify-content-between w-100 mb-4">
            {loading ? (
              <div className="d-flex align-items-center" style={{ height: '24px' }}>
                <div className="spinner-border text-light spinner-border-sm" role="status" />
              </div>
            ) : (
              <h4 className="text-white mb-0">{Admin.fullName}</h4>
            )}



            <button className="btn btn-outline-light" onClick={() => navigate('/admin/change-profile')}>
              Back to Profile
            </button>
          </div>

          <div className="shadow-lg p-4 rounded bg-dark text-white col-12 col-md-8 col-lg-6">
            <h2 className="mb-4 text-center">Change Password</h2>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control text-bg-dark"
                id="current_pw"
                placeholder="Current Password"
                onChange={(e) => setAdminPW({ ...AdminPW, password: e.target.value })} />
              <label htmlFor="current_pw" className='text-light' >Current Password</label>
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={setShowPassword1 ? 'text' : 'password'}
                className="form-control text-bg-dark"
                id="new_pw"
                placeholder="New Password"
                onChange={(e) => setAdminPW({ ...AdminPW, newPassword: e.target.value })} />
              <label htmlFor="new_pw" className='text-light' >New Password</label>
              <i
                className={`bi ${showPassword1 ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                onClick={() => setShowPassword1(!showPassword1)}
              ></i>
            </div>


            <button className="btn btn-light w-100 fw-semibold" disabled={btnDis} onClick={updatePw}>
              {btnDis ? (
                <>
                  Updateing Password....
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>
              ) : (
                " Update Password"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminPw;
