import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminSlidebar() {

  const [Admin, setAdmin] = useState({})
  const [loading, setloading] = useState(true)
  const [btnDis, setbtnDis] = useState(false)

  const navigate = useNavigate();

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

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:3046/api/v1/admin/logout",{}, {
        withCredentials: true,
      })
      setbtnDis(true)
      if (res.data?.success == true) {
        toast.success(res.data.message, { autoClose: 1500 })
        navigate('/admin/login')
        setTimeout(() => {
          window.location.reload
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
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-sticky top-0 overflow-auto" style={{ width: '280px', height: '100vh' }}>

      <div className="mb-3 fs-4 text-white">Admin Panel</div>
      <hr />

      <ul className="nav flex-column mb-auto">

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin')}>
          <i className="bi bi-people-fill me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">User List</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/post-event')}>
          <i className="bi bi-calendar-plus-fill me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Post Event</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/all-events')}>
          <i className="bi bi-pencil-square me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Update Event</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/post-category')}>
          <i className="bi bi-folder-plus me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Post Category</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/all-category')}>
          <i className="bi bi-folder-symlink me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Update Category</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/add-gallary')}>
          <i className="bi bi-images me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Add Gallery</span>
        </li>

        <li className="nav-item d-flex align-items-center crsptr mb-2" onClick={() => navigate('/admin/contacts')}>
          <i className="bi bi-person-lines-fill me-2 fs-5 text-white"></i>
          <span className="nav-link text-white">Contact List</span>
        </li>

      </ul>

      <div className="d-flex align-items-center text-white justify-content-between mt-auto">
        <div onClick={() => navigate('/admin/change-profile')} className="crsptr d-flex align-items-center">
          {loading ? (
            <div className="d-flex align-items-center" role="status">
              <div className="spinner-border text-light spinner-border-sm me-2" />
            </div>
          ) : (
            <strong className="fs-5">{Admin.fullName}</strong>
          )}
        </div>

        <button className="btn btn-outline-light btn-md ms-2" disabled={btnDis} onClick={logout}>
          {btnDis ? (
            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
          ) : (
            "Logout"
          )}

        </button>
      </div>
    </div>
  );
}

export default AdminSlidebar;
