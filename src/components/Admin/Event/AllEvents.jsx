import React, { useEffect, useRef, useState } from 'react';
import AdminSlidebar from '../AdminSlidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AllEvents() {

    const [allEvents, setAllEvents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const searchInput = useRef(null)
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchAllEvent = async () => {
            try {
                const res = await axios.get("http://localhost:3046/api/v1/admin/showallevents")
                console.log(res.data)
                if (res.data?.success == true) {
                    setAllEvents(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setloading(false)
            }
        }
        fetchAllEvent()
    }, [])

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                    <AdminSlidebar />
                </div>


                <div className="col-12 col-lg-9 px-4 py-5">

                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h2 className="text-white mb-0">Update Events</h2>

                        <div className="input-group w-50">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by event name or category..."
                                value={searchTerm}
                                id='searchTerm'
                                ref={searchInput}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="input-group-text" onClick={searchInput.current?.focus()} ><i className="bi bi-search"></i></span>
                        </div>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-dark table-bordered table-hover align-middle text-center">
                            <thead className="table-secondary text-dark">
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Schedule</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr className='placeholder-glow' key={i}>
                                            <td><span className="placeholder col-3 placeholder-sm" style={{ height: "50px", width: "70px" }} ></span></td>
                                            <td><span className="placeholder col-6 placeholder-sm"></span></td>
                                            <td><span className="placeholder col-6 placeholder-sm"></span></td>
                                            <td><span className="placeholder col-5 placeholder-sm"></span></td>
                                            <td><span className="placeholder col-4 placeholder-sm"></span></td>
                                            <td><span className="placeholder col-6 placeholder-sm"></span></td>
                                            <td>
                                                <span className="placeholder col-4 me-2 placeholder-sm"></span>
                                                {/* <span className="placeholder col-4 placeholder-sm"></span> */}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    allEvents
                                        .filter(e =>
                                            e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            e.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .reverse()
                                        .map((event, index) => (
                                            <tr key={event._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={event.image}
                                                        alt="event"
                                                        style={{ height: '50px', width: '70px', objectFit: 'cover' }}
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td title={event.title}>
                                                    {event.title.slice(0, 20)}{event.title.length > 20 ? '...' : ''}
                                                </td>
                                                <td title={event.category_name}>
                                                    {event.category_name?.slice(0, 15)}{event.category_name?.length > 15 ? '...' : ''}
                                                </td>
                                                <td>₹{event.price}</td>
                                                <td>
                                                    <small>
                                                        {event.s_date === event.e_date
                                                            ? formatDate(event.s_date)
                                                            : `${formatDate(event.s_date)} – ${formatDate(event.e_date)}`}
                                                    </small>
                                                </td>
                                                <td>
                                                    <button onClick={() => navigate(`/admin/update-event/${event._id}`)} className="btn btn-sm btn-primary me-1">
                                                        Edit
                                                    </button>
                                                    {/* <button className="btn btn-sm btn-danger">Delete</button> */}
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
    );
}

export default AllEvents;
