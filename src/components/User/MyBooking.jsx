import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyBooking() {

  const [userBookings, setuserBookings] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {

    const fetchBookings = async () => {
      try {
        setloading(true)
        const res = await axios.get("http://localhost:3046/api/v1/users/getbooking", {
          withCredentials: true,
        })
        console.log(res.data)
        if (res.data?.success) {
          setuserBookings(res.data.data)
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setloading(false)
      }
    }
    fetchBookings()
  }, [])

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <>
      <Header />
      <section className="container py-5">
        <h2 className="mb-4 fw-bold">My Booked Events</h2>
        {loading ? (
          <div className="row g-4">
            {[1, 2].map((n) => (
              <div className="col-12 col-lg-6" key={n}>
                <div className="card flex-row h-100 shadow-sm border-0 placeholder-glow">
                  <div className="w-50 d-flex align-items-center justify-content-center p-2">
                    <div className="bg-secondary placeholder w-100 h-100 rounded-start" style={{ height: '200px' }}></div>
                  </div>
                  <div className="card-body d-flex flex-column w-50">
                    <h5 className="placeholder col-8 mb-3 rounded"></h5>
                    <p className="placeholder col-10 mb-2 rounded"></p>
                    <p className="placeholder col-9 mb-2 rounded"></p>
                    <p className="placeholder col-7 mb-2 rounded"></p>
                    <p className="placeholder col-6 mb-2 rounded"></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-4">
            {userBookings.reverse().map((booking) => {
              const event = booking.event_id;
              return (
                <div key={booking._id} className="col-12 col-lg-6">
                  <div className="card flex-row h-100 shadow-sm border-0">
                    <div className="w-50">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="img-fluid h-100 object-fit-cover rounded-start p-2"
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column w-50">
                      <h5 className="fw-bold text-primary">{event.title}</h5>
                      <p className="mb-1"><strong>Booking ID:</strong> {booking._id}</p>
                      <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                      <p className="mb-1">
                        <strong>Event Date:</strong> {formatDate(event.s_date)} – {event.s_time}
                      </p>
                      <p className="mb-3"><strong>Price:</strong> ₹{event.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>
      <Footer />
    </>
  );
}

export default MyBooking;
