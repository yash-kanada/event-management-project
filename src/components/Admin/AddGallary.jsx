import AdminSlidebar from './AdminSlidebar'

function AddGallary() {



    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                {/* Sidebar */}
                <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                    <AdminSlidebar />
                </div>

                {/* Form Area */}
                <div className="col-12 col-lg-9 d-flex justify-content-center align-items-center">
                    <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center">
                        <form className="w-100 w-sm-75 w-md-25 shadow-lg p-4 rounded bg-dark text-white">
                            <h2 className="mb-4 text-center">Add Gallary</h2>

                            <div className="mb-4">
                                <label htmlFor="image" className="form-label">Upload Image</label>
                                <input className="form-control" type="file" id="image" accept="image/*" />
                            </div>

                            <div className="mb-4">
                                <button type="submit" className="btn btn-light w-100 fw-semibold">Post</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGallary
