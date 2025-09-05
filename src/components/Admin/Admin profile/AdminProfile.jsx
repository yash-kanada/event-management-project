import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSlidebar from '../AdminSlidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminProfile() {

  const [btnDis, setbtnDis] = useState(false)
  const [loading, setloading] = useState(true)

  const navigate = useNavigate();

  const [Admin, setAdmin] = useState({
    fullName: '',
    email: ''
  })

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

  const updateAdminDetails = async () => {
    const data = { fullName: Admin.fullName, email: Admin.email }
    try {
      const res = await axios.post("http://localhost:3046/api/v1/admin/update", data, {
        withCredentials: true,
      })
      setbtnDis(true)
      if (res.data?.success) {
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


          <div className="d-flex align-items-center justify-content-between w-100 mb-5">
            {loading ? (
              <div className="d-flex align-items-center" style={{ height: '24px' }}>
                <div className="spinner-border text-light spinner-border-sm" role="status" />
              </div>
            ) : (
              <h4 className="text-white mb-0">{Admin.fullName}</h4>
            )}

            <button className="btn btn-outline-light" onClick={() => navigate('/admin/change-password')}>
              Change Password
            </button>
          </div>

          <div className="shadow-lg p-4 rounded bg-dark text-white col-12 col-md-8 col-lg-6">
            <h2 className="mb-4 text-center">Update Profile</h2>

            <div className="form-floating mb-3">
              <input type="text" className="form-control text-bg-dark " id="admin_name" value={Admin.fullName} placeholder="Admin Name" onChange={(e) => setAdmin({ ...Admin, fullName: e.target.value })} />
              <label htmlFor="admin_name" className='text-light' >Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control text-bg-dark " id="admin_email" value={Admin.email} placeholder="Email" onChange={(e) => setAdmin({ ...Admin, email: e.target.value })} />
              <label htmlFor="admin_email" className='text-light' >Email</label>
            </div>

            <button className="btn  btn-light w-100 fw-semibold" disabled={btnDis} onClick={updateAdminDetails}>
              {btnDis ? (
                <>
                  Updateing profile...
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>
              ) : (
                " Update"
              )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
