import { useRef, useState } from 'react'
import AdminSlidebar from '../AdminSlidebar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PostCat() {

    const [category_name, setCategory_name] = useState("")
    const [image, setImage] = useState(null)
    const [btnDis, setBtnDis] = useState(false)
    const fileRef = useRef()
    const navigate = useNavigate()

    const func = async () => {
        const formdata = new FormData();
        formdata.append("category_name", category_name)
        formdata.append("URL", image)
        try {
            setBtnDis(true)
            const res = await axios.post("http://localhost:3046/api/v1/admin/addcategory", formdata, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(res.data)
            if (res.data?.success == true) {
                toast.success(res.data.message,{autoClose:1500})
                navigate('/admin/all-category')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1500);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setBtnDis(false)
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
                        <div className="w-100 w-sm-75 w-md-25 shadow-lg p-4 rounded bg-dark text-white">
                            <h2 className="mb-4 text-center">Post Category</h2>

                            <div className="mb-4">
                                <label htmlFor="cat_img" className="form-label">Upload Image</label>
                                <input className="form-control" type="file" id="cat_img" accept="image/*" ref={fileRef} onChange={(e) => setImage(e.target.files[0])} />
                            </div>

                            <div className="form-floating mb-4">
                                <input type="text" className="form-control" id="category_name" placeholder="Category Name " required onChange={(e) => setCategory_name(e.target.value)} />
                                <label htmlFor="category_name">Category Name</label>
                            </div>


                            <div className="mb-4">
                                <button className="btn btn-light w-100 fw-semibold" disabled={btnDis} onClick={func}>
                                    {btnDis ? (
                                        <>
                                            Posting category...
                                            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                        </>
                                    ) : (
                                        "Post Category"
                                    )}
                                </button>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PostCat
