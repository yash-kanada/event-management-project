import React, { useEffect, useRef, useState } from 'react';
import AdminSlidebar from '../AdminSlidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PostEvent() {

    const fileRef = useRef()
    const navigate = useNavigate()

    const [allCat, setallCat] = useState([])

    const [title, setTitle] = useState()
    const [s_date, setS_date] = useState()
    const [e_date, setE_date] = useState()
    const [s_time, setS_time] = useState()
    const [e_time, setE_time] = useState()
    const [location, setLocation] = useState()
    const [description, setDescription] = useState()
    const [category_id, setCategory_id] = useState()
    const [category_name, setCategory_name] = useState()
    const [price, setPrice] = useState()
    const [image, setImage] = useState()
    const [loading, setloading] = useState(true)
    const [btnDis, setbtnDis] = useState(false)
    // for disabled btn



    useEffect(() => {

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
            }finally{
                setloading(false)
            }
        }
        fetchCat()

    }, [])

    const func = async () => {

        setloading(true)
        const data = new FormData();
        data.append("title", title)
        data.append("s_date", s_date)
        data.append("e_date", e_date)
        data.append("s_time", s_time)
        data.append("e_time", e_time)
        data.append("location", location)
        data.append("description", description)
        data.append("category_id", category_id)
        data.append("category_name", category_name)
        data.append("price", price)
        data.append("image", image)

        setbtnDis(true)

        try {
            const res = await axios.post("http://localhost:3046/api/v1/admin/addevent", data, {
                withCredentials: true,
            })
            console.log(res.data)
            if (res.data?.success === true) {
                toast(res.data.message, { autoClose: 1300 })
                setTitle("");
                setS_date("")
                setE_date("")
                setS_time("")
                setE_time("")
                setLocation("")
                setDescription("")
                setCategory_id("")
                setCategory_name("")
                setPrice("")
                setImage(null)
                navigate('/admin/all-events')
                fileRef.current.value = "";
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1300);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
            setbtnDis(false)
        }

    }


    return (
        <>
            {loading && <div>Loading...</div>}
            <div className="container-fluid">
                <div className="row min-vh-100">

                    <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                        <AdminSlidebar />
                    </div>


                    <div className="col-12 col-lg-9 d-flex justify-content-center align-items-center">

                        {/* <form className="col-12 col-sm-10 col-md-8 col-lg-6 shadow-lg p-4 rounded bg-dark text-white"> */}
                        <div className="col-12 col-sm-10 col-md-10 col-lg-8 shadow-lg p-4 rounded bg-dark text-white">

                            <h2 className="mb-4 text-center">Post Event</h2>

                            <div className="mb-3">
                                <label htmlFor="event_img" className="form-label">Upload Image</label>
                                <input className="form-control" type="file" id="event_img" accept="image/*" ref={fileRef} onChange={(e) => setImage(e.target.files[0])} />
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="event_title" placeholder="Event Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                                <label htmlFor="event_title">Title</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="s_date" value={s_date} required onChange={(e) => setS_date(e.target.value)} />
                                <label htmlFor="s_date">Start Date</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="e_date" value={e_date} required onChange={(e) => setE_date(e.target.value)} />
                                <label htmlFor="e_date">End Date</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" id="s_time" value={s_time} required onChange={(e) => setS_time(e.target.value)} />
                                <label htmlFor="s_time">Start Time</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" id="e_time" value={e_time} required onChange={(e) => setE_time(e.target.value)} />
                                <label htmlFor="e_time">End Time</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="location" placeholder="Event Location" value={location} required onChange={(e) => setLocation(e.target.value)} />
                                <label htmlFor="location">Location</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="description" placeholder="Description" style={{ height: '100px' }} value={description} required onChange={(e) => setDescription(e.target.value)} ></textarea>
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
                                <input type="number" className="form-control" id="price" placeholder="Ticket Price" value={price} required onChange={(e) => setPrice(e.target.value)} />
                                <label htmlFor="price">Price</label>
                            </div>

                            <div className="mb-3">
                                <button disabled={btnDis} onClick={func} className="btn btn-light w-100 fw-semibold">
                                    {btnDis ? (
                                        <>
                                            Posting...
                                            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                        </>
                                    ) : (
                                        'Post Event'
                                    )}
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default PostEvent;
