import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

function About() {
    const navigate = useNavigate()
    return (
        <>
            <Header />

            <section
                className="text-white d-flex align-items-center"
                style={{
                    backgroundImage: "url('/images/party-event.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '90vh',
                    position: 'relative'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1
                }}></div>

                <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
                    <h1 className="display-4 fw-bold">Turn Moments into Memories</h1>
                    <p className="lead mt-3">
                       Whether it’s an elegant wedding, a joyful birthday, or a high-impact corporate event — we turn your moments into lasting memories with creativity, passion, and seamless execution.
                    </p>

                </div>
            </section>

            <section className="bg-dark text-white py-5">
                <div className="container px-4 py-5 text-white" id="about-icons">
                    <h2 className="pb-2 border-bottom text-center">What Sets Us Apart</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">

                        {/* Our Mission */}
                        <div className="col d-flex align-items-start">
                            <div className="icon-square bg-white d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded p-1">
                                <lord-icon
                                    src="https://cdn.lordicon.com/oqdmuxru.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#000000"
                                    style={{ width: "35px", height: "35px" }}>
                                </lord-icon>
                            </div>
                            <div>
                                <h3 className="fs-4">Our Mission</h3>
                                <p>To turn every event into a personalized and unforgettable experience, blending creativity with flawless execution.</p>
                                <button className="btn btn-outline-light fw-semibold" onClick={() => navigate('/services')}>Explore Services</button>
                            </div>
                        </div>

                        {/* Our Vision */}
                        <div className="col d-flex align-items-start">
                            <div className="icon-square bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded p-1">
                                <lord-icon
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "35px", height: "35px" }}>
                                </lord-icon>
                            </div>
                            <div>
                                <h3 className="fs-4">Our Vision</h3>
                                <p>To be the go-to destination for premium event planning that reflects elegance, joy, and precision.</p>
                                <button className="btn btn-outline-light fw-semibold" onClick={() => navigate('/gallery')}>View Gallery</button>
                            </div>
                        </div>

                        {/* Our Story */}
                        <div className="col d-flex align-items-start">
                            <div className="icon-square bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded p-1">
                                <lord-icon
                                    src="https://cdn.lordicon.com/yxyampao.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#000000"
                                    style={{ width: "35px", height: "35px" }}>
                                </lord-icon>
                            </div>
                            <div>
                                <h3 className="fs-4">Our Story</h3>
                                <p>What began as a passion project is now a thriving team dedicated to making every celebration truly special.</p>
                                <button className="btn btn-outline-light fw-semibold" onClick={() => navigate('/contact')}>Get in Touch</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="container py-5">
                <div className="row justify-content-center gap-5">

                    {/* Card 1: Our Story */}
                    <div className="card text-bg-dark border-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-light">Our Story</div>
                        <div className="card-body">
                            <h5 className="card-title">Celebrating Beginnings</h5>
                            <p className="card-text">Founded with love for events, we’ve grown from a small idea to a full-fledged celebration powerhouse.</p>
                        </div>
                    </div>

                    {/* Card 2: Our Mission */}
                    <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-black">Our Mission</div>
                        <div className="card-body">
                            <h5 className="card-title">Crafting Joy</h5>
                            <p className="card-text">To deliver seamless, joyful, and unique experiences for every occasion, big or small.</p>
                        </div>
                    </div>

                    {/* Card 3: Why Choose Us */}
                    <div className="card text-bg-dark border-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-light">Why Choose Us</div>
                        <div className="card-body">
                            <h5 className="card-title">Trusted Event Experts</h5>
                            <p className="card-text">We bring professionalism, creativity, and care to every event we plan and manage.</p>
                        </div>
                    </div>

                    {/* Card 4: Our Values */}
                    <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-black">Our Values</div>
                        <div className="card-body">
                            <h5 className="card-title">Integrity & Dedication</h5>
                            <p className="card-text">We value honesty, customer satisfaction, and going the extra mile to make memories.</p>
                        </div>
                    </div>

                    {/* Card 5: Events Delivered */}
                    <div className="card text-bg-dark border-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-light">Our Reach</div>
                        <div className="card-body">
                            <h5 className="card-title">250+ Events</h5>
                            <p className="card-text">From weddings to corporate gatherings, we’ve delivered hundreds of successful events across India.</p>
                        </div>
                    </div>

                    {/* Card 6: Community */}
                    <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header border-black">Community</div>
                        <div className="card-body">
                            <h5 className="card-title">Our Clients, Our Pride</h5>
                            <p className="card-text">We’ve built lasting relationships through exceptional service and heartfelt celebrations.</p>
                        </div>
                    </div>

                </div>
            </section>


            <Footer />
        </>
    )
}

export default About
