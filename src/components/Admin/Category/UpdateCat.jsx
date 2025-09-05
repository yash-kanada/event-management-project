import { useNavigate, useParams } from 'react-router-dom';
import AdminSlidebar from '../AdminSlidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateCat() {

    const { cat_id } = useParams()
    const navigate = useNavigate()
    const [cat, setCat] = useState({
        category_name: '',
        URL: ''
    })
    const [loading, setloading] = useState(true)
    const [btnDis, setBtnDis] = useState(false)


    useEffect(() => {

        const fetchCat = async () => {
            try {
                const res = await axios.get("http://localhost:3046/api/v1/admin/showcategory")
                console.log(res.data.message)
                setloading(true)
                if (res.data?.success == true) {
                    const allCat = res.data.message
                    const selectedCat = allCat.find(c => c._id === cat_id)
                    setCat(selectedCat)
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
    }, [cat_id])


    const func = async () => {
        try {
            const formData = new FormData();
            formData.append("category_name", cat.category_name);
            formData.append("URL", cat.URL);
            setBtnDis(true);

            const res = await axios.post(`http://localhost:3046/api/v1/admin/updatecategory/${cat_id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data?.success === true) {
                toast.success(res.data.message,{autoClose:1300});
                navigate('/admin/all-category')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1300);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBtnDis(false);
        }
    }


    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                    <AdminSlidebar />
                </div>


                <div className="col-12 col-lg-9 d-flex flex-column justify-content-center align-items-center">
                    <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <form className="w-100 w-sm-75 w-md-25 shadow-lg p-4 rounded bg-dark text-white">
                                <h2 className="mb-4 text-center">Update Category</h2>

                                <div className="mb-4">
                                    <label htmlFor="cat_img" className="form-label">Upload Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="cat_img"
                                        accept="image/*"
                                        onChange={(e) => setCat({ ...cat, URL: e.target.files[0] })}
                                    />
                                </div>

                                <div className="form-floating mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category_name"
                                        value={cat.category_name}
                                        placeholder="Category Name"
                                        required
                                        onChange={(e => setCat({ ...cat, category_name: e.target.value }))}
                                    />
                                    <label htmlFor="category_name">Category Name</label>
                                </div>

                                <div className="mb-4">
                                    <button className="btn btn-light w-100 fw-semibold" disabled={btnDis} onClick={func}>
                                        {btnDis ? (
                                            <>
                                                Updating....
                                                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                            </>
                                        ) : (
                                            "Update Category"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>

                    {/* <div className="col-12 col-lg-9">
                        <div className="p-3">
                            <h3 className="mb-4">Categories</h3>

                            <div className="table-responsive">
                                <table className="table table-dark table-hover align-middle text-center">
                                    <thead className="table-light text-dark">
                                        <tr>
                                            <th>No</th>
                                            <th>Image</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(5)].map((_, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <img
                                                        src="/images/planTrip/Religious/Rel-cover.jpg"
                                                        alt="profile"
                                                        width="100"
                                                        height="70"
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td>Spiritual & Religious Places</td>
                                                <td>
                                                    <i className='crsptr'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                            style={{ width: "30px", height: "30px" }}>
                                                        </lord-icon>
                                                    </i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default UpdateCat;
