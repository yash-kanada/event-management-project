import React, { useEffect, useState, useRef } from 'react';
import AdminSlidebar from '../AdminSlidebar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateEvent() {
    const { event_id } = useParams();
    const navigate = useNavigate()

    const [allCat, setallCat] = useState([])
    const [loading, setloading] = useState(true)
    const [category_id, setCategory_id] = useState()
    const [category_name, setCategory_name] = useState()
    const [BtnDis, setBtnDis] = useState(false)



    const fileRef = useRef();
    const [event, setEvent] = useState({
        title: '',
        s_date: '',
        e_date: '',
        s_time: '',
        e_time: '',
        location: '',
        description: '',
        category_id: '',
        category_name: '',
        price: '',
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setloading(true)
                const res = await axios.post("http://localhost:3046/api/v1/admin/showevents", {
                    _id: event_id
                });
                const fetchedEvent = res.data.data;
                setEvent(fetchedEvent);
                setCategory_id(fetchedEvent.category_id);
                setCategory_name(fetchedEvent.category_name);
                console.log("Fetched Event:", res.data.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setloading(false)
            }
        };

        const fetchCat = async () => {
            try {
                setloading(true)
                const res = await axios.get("http://localhost:3046/api/v1/admin/showcategory")
                console.log(res.data)
                if (res.data?.success == true) {
                    setallCat(res.data.message)
                } else {
                    toast.error("data not fatched successfully")
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }
        fetchCat()
        fetchEvent();
    }, [event_id]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("title", event.title);
            formData.append("s_date", event.s_date);
            formData.append("e_date", event.e_date);
            formData.append("s_time", event.s_time);
            formData.append("e_time", event.e_time);
            formData.append("location", event.location);
            formData.append("description", event.description);
            formData.append("category_id", category_id);
            formData.append("category_name", category_name);
            formData.append("price", event.price);
            setBtnDis(true)

            if (image) {
                formData.append("URL", image);
            }

            const res = await axios.post(`http://localhost:3046/api/v1/admin/updateevent/${event_id}`, formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            if (res.data?.success) {
                toast.success(res.data.message, { autoClose: 1300 })
                navigate('/admin/all-events')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1300);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("Failed to update: " + error.message);
        } finally {
            setBtnDis(false)
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEvent(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                    <AdminSlidebar />
                </div>

                <div className="col-12 col-lg-9 d-flex justify-content-center align-items-center">
                    <div className="col-12 col-sm-10 col-md-10 col-lg-8 shadow-lg p-4 rounded bg-dark text-white">


                        <h2 className="mb-4 text-center">Update Event</h2>

                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="event_img" className="form-label">Upload Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="event_img"
                                        accept="image/*"
                                        ref={fileRef}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="title" value={event.title} onChange={handleInputChange} required />
                                    <label htmlFor="title">Title</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="s_date" value={event.s_date} onChange={handleInputChange} required />
                                    <label htmlFor="s_date">Start Date</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="e_date" value={event.e_date} onChange={handleInputChange} required />
                                    <label htmlFor="e_date">End Date</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="time" className="form-control" id="s_time" value={event.s_time} onChange={handleInputChange} required />
                                    <label htmlFor="s_time">Start Time</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="time" className="form-control" id="e_time" value={event.e_time} onChange={handleInputChange} required />
                                    <label htmlFor="e_time">End Time</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="location" value={event.location} onChange={handleInputChange} required />
                                    <label htmlFor="location">Location</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="description" value={event.description} onChange={handleInputChange} style={{ height: '100px' }} required />
                                    <label htmlFor="description">Description</label>
                                </div>

                                <div className="form-floating mb-3" >
                                    <select
                                        className="form-select"
                                        id="category_id"
                                        value={category_id}
                                        required
                                        onChange={(e) => {
                                            const id = e.target.value
                                            setCategory_id(id)
                                            const selectedCat = allCat.find((cat) => cat._id === id)
                                            setCategory_name(selectedCat?.category_name || "")
                                        }}
                                    >
                                        <option disabled={category_id}>Choose category</option>
                                        {[...allCat]?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="category_id">Category</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" value={event.price} onChange={handleInputChange} required />
                                    <label htmlFor="price">Price</label>
                                </div>

                                <div className="mb-3">
                                    <button type="button" onClick={handleUpdate} disabled={BtnDis} className="btn btn-light w-100 fw-semibold">
                                        {BtnDis ? (
                                            <>
                                                Updating....
                                                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                            </>
                                        ) : (
                                            "Update Event"
                                        )}
                                    </button>
                                </div>
                            </>
                        )}




                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateEvent;
