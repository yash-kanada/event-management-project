import React, { useEffect, useState } from 'react'
import AdminSlidebar from '../AdminSlidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AllCategory() {

  const [allCat, setAllCat] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setloading] = useState(true)
  const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const savedScroll = sessionStorage.getItem('scrollPosition')
    if (savedScroll !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
        sessionStorage.removeItem('scrollPosition')
      }, 500);
    }

    const fetchCat = async () => {
      try {
        const res = await axios.get("http://localhost:3046/api/v1/admin/showcategory")
        console.log(res.data.message)
        if (res.data?.success == true) {
          setAllCat(res.data.message)
          setloading(true)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setloading(false)
      }
    }
    fetchCat()
  }, [])


  const userDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3046/api/v1/admin/deletecategory/${id}`,{
        withCredentials : true,
      })
      setbtnDis(true)
      if (res.data?.success == true) {
        toast.success(res.data.message, { autoClose: 1500 })
        const scrollY = window.scrollY
        setTimeout(() => {
          console.log("Saved scrollY:", window.scrollY);
          sessionStorage.setItem('scrollPosition', scrollY)
          window.location.reload()
        }, 1000);
      }else{
        toast.error(res.data.message)
      }
    }catch(error){
      toast.error(error.message)
    }finally{
      setbtnDis(false)
    }
  }


  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        <div className="col-12 col-lg-3 mb-4 mb-lg-0">
          <AdminSlidebar />
        </div>


        <div className="col-12 col-lg-9 px-4 py-5">

          <div className='d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4'>
            <h2 className="text-white mb-0">Update Categories</h2>

            <div className="input-group w-50 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search category..."
                value={searchTerm}
                id='searchTerm'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text"><i className="bi bi-search"></i></span>
            </div>
          </div>


          <div className="table-responsive">
            <table className="table table-dark  table-hover align-middle text-center">
              <thead className="table-secondary text-dark">
                <tr>
                  <th style={{ width: '5%' }}>No</th>
                  <th style={{ width: '15%' }}>Image</th>
                  <th>Category Name</th>
                  <th style={{ width: '20%' }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  [...Array(4)].map((_, index) => (
                    <tr key={index} className='placeholder-glow'>
                      <td>
                        <span className="placeholder col-3"></span>
                      </td>
                      <td>
                        <div className="placeholder rounded bg-secondary" style={{ height: '60px', width: '100%', maxWidth: '80px' }}></div>
                      </td>
                      <td>
                        <span className="placeholder col-6"></span>
                      </td>
                      <td>
                        <span className="placeholder btn btn-secondary disabled col-4 me-2"></span>
                        <span className="placeholder btn btn-secondary disabled col-4"></span>
                      </td>
                    </tr>
                  ))
                ) : (
                  allCat.filter(e =>
                    e.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
                  ).reverse().map((cat, index) => (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={cat.URL}
                          alt={cat.category_name}
                          className="img-fluid rounded"
                          style={{ height: '60px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{cat.category_name}</td>
                      <td>
                        <button className="btn btn-sm btn-primary mb-2 mb-md-0 me-2" onClick={() => navigate(`/admin/update-category/${cat._id}`)}>Edit</button>
                        <button className="btn btn-sm btn-danger" disabled={btnDis} onClick={()=>userDelete(cat._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>


            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AllCategory
