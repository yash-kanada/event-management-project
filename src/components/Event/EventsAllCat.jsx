import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function EventsAllCat() {

  const [allcat, setAllcat] = useState([])
  const [loading, setloading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchALLCat = async () => {
      try {
        setloading(true)
        const res = await axios.get("http://localhost:3046/api/v1/admin/showcategory")
        console.log(res.data)
        if (res.data?.success == true) {
          // toast.success("Fetch categories successfully", { autoClose: 1000 })
          setAllcat(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setloading(false)
      }
    }
    fetchALLCat()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <section className="container py-4">
          <div className="row g-4 justify-content-start">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="card text-bg-dark shadow-lg rounded h-100">
                  <div
                    className="placeholder-glow"
                    style={{ height: '300px', backgroundColor: '#6c757d33', borderRadius: '0.5rem' }}
                  >
                    <div className="w-100 h-100 placeholder rounded"></div>
                  </div>
                  <div className="card-footer text-center border-0">
                    <span className="placeholder col-6 bg-secondary rounded">&nbsp;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Header />



      <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }} className='py-4'>
        <img
          src="/images/event-page-poster.jpg"
          alt="music event"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'brightness(0.6)' }}
          loading='lazy'
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
          <h1 className="display-5 fw-bold text-white">Explore All Event Categories</h1>
          <p className="lead text-white-50">
            From thrilling sports matches and electrifying concerts to gourmet food fests and professional summits — browse all our event categories and find your next experience!
          </p>
        </div>

      </div>

      <section className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="row g-4 justify-content-start">

          {allcat.filter(c =>
            c.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            searchTerm.toLowerCase() === "all" && c.category_name.toLowerCase()
          ).reverse().map((cat) => (
            <div key={cat._id} className="col-12 col-md-6 col-lg-4 crsptr" onClick={() => navigate(`/events/${cat._id}`)} >
              <div className="card text-bg-dark shadow-lg rounded h-100">
                <div className="card-body p-0" style={{ height: '300px', overflow: 'hidden' }}>
                  <img src={cat.URL} className="card-img-top object-fit-cover" alt="Spiritual" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                </div>
                <div className="card-footer text-center border-0 fw-semibold">
                  {cat.category_name}
                </div>
              </div>
            </div>
          ))}


        </div>
      </section>

      <Footer />

    </>
  )
}

export default EventsAllCat
