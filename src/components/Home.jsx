import React from 'react'
import Header from './Header'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Header />

      <div className='bg-dark'>
        <div id="carouselExampleIndicators" className="carousel slide  carousel-fade" data-bs-ride="carousel" data-bs-interval="2500">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <img src="/images/birthday-event.jpg" loading='lazy' className="d-block w-100 img-fluid object-fit-cover" style={{ height: '500px' }} alt="birthday event" />
              <div className="carousel-caption  d-md-block ">
                <h5>Joyful Birthday Bash</h5>
                <p>Unforgettable moments crafted with fun, colors, and cake!</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/wedding-1-event.jpg" loading='lazy' className="d-block w-100 img-fluid object-fit-cover" style={{ height: '500px' }} alt="wedding event" />
              <div className="carousel-caption d-md-block">
                <h5>Elegant Wedding Ceremony</h5>
                <p>Where dreams unite and memories begin forever</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/business-event.jpg" loading='lazy' className="d-block w-100 img-fluid object-fit-cover" style={{ height: '500px' }} alt="business event" />
              <div className="carousel-caption  d-md-block">
                <h5>Professional Business Meet</h5>
                <p>Strategic minds, collaborative goals, and impactful decisions</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <section className="bg-dark text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to The Event Box</h1>
          <p className="lead">
            We plan. You enjoy. From birthdays to business meets, we create unforgettable events.
            Our team brings creativity, precision, and passion to every celebration.
            Whether it’s an intimate gathering or a grand affair, we handle it all — from concept to execution.
          </p>
          <button className="btn btn-light btn-lg mt-3 fw-medium">Book Your Event Now</button>
        </div>
      </section>

      <section className="py-5 text-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold">Your Dream Event, Our Expert Touch</h1>
              <p className="py-2 ">From intimate gatherings to grand celebrations, The Event Box brings your vision to life with creativity and precision.</p>
              <button className='btn btn-lg btn-outline-light mb-3 mb-md-0 fw-medium'>View Our Work</button>
            </div>
            <div className="col-md-6">
              <img src="/images/wedding-event.jpg" loading='lazy' className="img-fluid rounded-3 shadow" alt="Event Showcase" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-dark text-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">We Specialize In</h2>
          <div className="row">
            {[
              { icon: "bi-balloon", title: "Birthday Parties" },
              { icon: "bi-gem", title: "Weddings" },
              { icon: "bi-briefcase", title: "Corporate Events" },
              { icon: "bi-music-note-beamed", title: "Concerts & Shows" },
              { icon: "bi-house-heart", title: "Private Gatherings" },
              { icon: "bi-camera-reels", title: "Photo & Video Shoots" }
            ].map((item, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <i className={`bi ${item.icon} fs-1 text-primary mb-3`}></i>
                <h5>{item.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="fw-bold">Let’s Plan Your Event</h2>
          <p className="lead">We’re just a message away from making your event unforgettable.</p>
          <button  className="btn btn-light btn-lg mt-2 fw-medium">
            Contact Us
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home

