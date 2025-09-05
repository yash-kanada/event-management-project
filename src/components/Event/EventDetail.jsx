import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Modal } from 'bootstrap'

function EventDetail() {
  const { event_id } = useParams()
  const [event, setEvent] = useState({})
  const [loading, setloading] = useState(true)
  const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate()

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setloading(true)
        const res = await axios.post("http://localhost:3046/api/v1/admin/showevents", { _id: event_id })
        console.log(res.data.data)
        if (res.data?.success == true) {
          setEvent(res.data.data)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setloading(false)
      }
    }
    fetchEvent()
  }, [event_id])


  const booking = async () => {
    try {
      setbtnDis(true)
      const res = await axios.post("http://localhost:3046/api/v1/users/booking", { event_id }, {
        withCredentials: true,
      })
      if (res.data?.success) {
        toast.success(res.data.message, { autoClose: 1000 })
        navigate('/my-booking')
      } else {
        toast.error(res.data.message,{autoClose:1000})
      }
    } catch (error) {
      toast.error(error.message,{autoClose:1000})
    } finally {
      setbtnDis(false)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  if (loading) {
    return (
      <>
        <Header />

        <div className="bg-dark text-white">

          <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
            <div className="placeholder-glow w-100 h-100 bg-secondary"></div>
            <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
              <h1 className="placeholder col-6 bg-light rounded mx-auto mb-3"></h1>
              <p className="placeholder col-4 bg-light rounded mx-auto"></p>
            </div>
          </div>

          <div className="container py-5">
            <div className="row g-5">


              <div className="col-lg-8">
                <h2 className="placeholder col-5 bg-light rounded mb-4"></h2>

                {[...Array(4)].map((_, i) => (
                  <p key={i} className="placeholder-glow mb-3">
                    <span className="placeholder col-6 bg-secondary rounded"></span>
                  </p>
                ))}

                <h4 className="placeholder col-4 bg-light rounded mt-5 mb-3"></h4>
                <p className="placeholder-glow">
                  <span className="placeholder col-12 bg-secondary rounded"></span>
                  <span className="placeholder col-11 bg-secondary rounded"></span>
                  <span className="placeholder col-10 bg-secondary rounded"></span>
                </p>
              </div>


              <div className="col-lg-4">
                <div className="bg-black text-white border border-black rounded-4 p-4 shadow-lg">
                  <h4 className="placeholder col-6 bg-light rounded mb-3"></h4>
                  <h1 className="placeholder col-4 bg-secondary rounded mb-3"></h1>
                  <div className="placeholder btn btn-light btn-lg w-100 mb-3"></div>
                  <p className="placeholder col-8 bg-secondary rounded"></p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }


  return (

    <>

      <Header />

      {/* for booking confirm model */}
      <section aria-label="Confirm booking modal">
        <div
          className="modal fade"
          id="confirmBookingModal"
          tabIndex="-1"
          aria-labelledby="confirmBookingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmBookingModalLabel">Confirm Booking</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to confirm this booking?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-success" disabled={btnDis} onClick={booking} >
                  {btnDis ? (
                    <>
                      Booking...
                      <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                    </>
                  ) : (
                    ' Yes, Confirm'
                  )}

                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-dark text-white">
        <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
          <img
            src={event.image}
            alt={event.title}
            className="w-100 h-100 object-fit-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
            <h1 className="display-3 fw-bold">{event.title}</h1>
            <p className="lead">{event.location}</p>
          </div>
        </div>


        <div className="container py-5">
          <div className="row g-5">

            <div className="col-lg-8">
              <h2 className="fw-bold mb-4">Event Details</h2>
              <div className="mb-4">
                <p>
                  <i className="bi bi-calendar-event me-2 text-primary"></i>
                  {event.s_date === event.e_date
                    ? formatDate(event.s_date)
                    : `${formatDate(event.s_date)} – ${formatDate(event.e_date)}`}
                </p>
                <p><i className="bi bi-clock me-2 text-warning"></i>{event.s_time} – {event.e_time}</p>
                <p><i className="bi bi-geo-alt-fill me-2 text-danger"></i>{event.location}</p>
                <p><i className="bi bi-currency-rupee me-2 text-success"></i>{event.price == 0 ? "Free" : `${event.price}`}</p>
              </div>

                <h4 className="fw-semibold mt-5 mb-3">About the Event</h4>
                <p className="text-white-50"  style={{ whiteSpace: "pre-line" }} >{event.description}</p>
            </div>


            <div className="col-lg-4 ">
              <div className="bg-black text-white border border-black rounded-4 p-4 shadow-lg">
                <h4 className="fw-semibold mb-3">Reserve Your Seat</h4>
                <h1 className="display-6 fw-bold mb-3">{event.price == 0 ? 'Free' : `₹${event.price}`}</h1>
                <button id="book-now-btn" className="btn btn-light btn-lg w-100 mb-3 d-flex align-items-center justify-content-center gap-3 fw-medium" data-bs-toggle="modal" data-bs-target="#confirmBookingModal">Book Now
                  <span className=''>
                    <lord-icon
                      src="https://cdn.lordicon.com/gyblqrqz.json"
                      trigger="hover"
                      colors="primary:#000000"
                      target="#book-now-btn"
                      style={{ width: "30px", height: "30px", verticalAlign: "middle" }}>
                    </lord-icon>
                  </span>
                </button>
                {/* <button className="btn btn-light btn-lg w-100 mb-3">Book Now</button> */}

                <p className="mb-0">
                  Questions?{' '}
                  <span
                    className="text-decoration-underline crsptr"
                    onClick={() => navigate('/contactus')}
                  >
                    Contact Us
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default EventDetail
