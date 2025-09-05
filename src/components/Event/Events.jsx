import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function Events() {

    const { cat_id } = useParams()
    const navigate = useNavigate()
    const [selectedCat, setSelectedCat] = useState({})
    const [EventsbyCat, setEventsbyCat] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchALLCat = async () => {
            try {
                setloading(true)
                const res = await axios.get("http://localhost:3046/api/v1/admin/showcategory")
                console.log(res.data)
                if (res.data?.success == true) {
                    const allCat = res.data.message
                    const catbyId = allCat.find(c => c._id === cat_id)
                    setSelectedCat(catbyId)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }
        const fetchEventsbyCat = async () => {
            try {
                setloading(true)
                const res = await axios.post("http://localhost:3046/api/v1/admin/showeventsbycategory", { category_id: cat_id })
                console.log(res.data.data)
                if (res.data?.success == true) {
                    // toast.success(res.data.message, { autoClose: 1000 })
                    setEventsbyCat(res.data.data)
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
        fetchEventsbyCat()
    }, [cat_id])

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    if (loading) {
        return (
            <>
                <Header />
                <section className="container py-4">
                    <div className="row g-5">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className="card text-bg-dark shadow-lg h-100">
                                    <div className="placeholder-glow">
                                        <div
                                            className="placeholder bg-secondary rounded w-100"
                                            style={{ height: '220px' }}
                                        ></div>
                                    </div>

                                    <div className="card-body px-3 d-flex flex-column justify-content-between">
                                        <h5 className="placeholder-glow">
                                            <span className="placeholder col-8 bg-secondary rounded"></span>
                                        </h5>

                                        <div className="pt-2">
                                            <p className="mb-1 placeholder-glow">
                                                <span className="placeholder col-5 bg-secondary rounded"></span>
                                            </p>
                                            <p className="mb-1 placeholder-glow">
                                                <span className="placeholder col-4 bg-secondary rounded"></span>
                                            </p>
                                            <p className="mb-1 placeholder-glow">
                                                <span className="placeholder col-6 bg-secondary rounded"></span>
                                            </p>
                                        </div>

                                        <div className="d-grid pt-3">
                                            <div className="placeholder-glow">
                                                <span className="placeholder col-6 bg-secondary rounded py-2"></span>
                                            </div>
                                        </div>
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

            <section className="position-relative pb-4">
                <div className="card text-bg-dark container-fluid p-0" style={{ height: '500px', overflow: 'hidden' }}>
                    <img
                        src={selectedCat.URL}
                        className="card-img object-fit-cover"
                        alt={selectedCat.category_name}
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 text-white text-center px-3">
                        <h1 className="display-4 fw-bold">{selectedCat.category_name}</h1>
                        <p className="lead">Explore all {selectedCat.category_name} events and book your seat!</p>

                    </div>
                </div>
            </section>

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
                <div className="row g-5">
                    {EventsbyCat.filter(event =>
                        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchTerm.toLowerCase)
                    ).reverse().map((event, index) => (
                        <div
                            key={event._id}
                            className="col-12 col-md-6 col-lg-4 crsptr"
                            onClick={() => navigate(`/event-detail/${event._id}`)} // Add routing here
                        >
                            <div className="card text-bg-dark shadow-lg h-100">
                                <img
                                    src={event.image}
                                    className="card-img-top object-fit-cover"
                                    alt={event.title}
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <div className="card-body px-3 mt-2 d-flex flex-column justify-content-between">
                                    <h5 className="card-title fw-semibold fs-5">{event.title}</h5>


                                    <div className="pt-2">
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <p className="mb-1"><strong>Date:</strong> {formatDate(event.s_date)}</p>
                                                <p className="mb-1"><strong>Time:</strong> {event.s_time}</p>
                                            </div>
                                            <div className="text-end">
                                                <p className="fs-5 fw-semibold text-white mb-0">{event.price == 0 ? "Free" : `₹${event.price}`}</p>
                                            </div>
                                        </div>
                                        <div className="text-white-50">
                                            <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                                        </div>
                                    </div>


                                    <div className="d-grid pt-3">
                                        <button
                                            type="button"
                                            className="fw-semibold btn btn-light d-flex align-items-center justify-content-center gap-2"
                                            id={`btn-${index}`}
                                        >
                                            View Details
                                            <lord-icon
                                                src="https://cdn.lordicon.com/whtfgdfm.json"
                                                trigger="hover"
                                                target={`#btn-${index}`}
                                                colors="primary:#000000"
                                                style={{ width: "28px", height: "28px" }}
                                            ></lord-icon>
                                        </button>
                                    </div>
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

export default Events
