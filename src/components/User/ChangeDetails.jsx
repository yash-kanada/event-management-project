import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function ChangeDetails() {

    const [user, setUser] = useState()
    const [btnDis, setbtnDis] = useState(false)
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setloading(true)
                const res = await axios.get("http://localhost:3046/api/v1/users/getcurrentUser", {
                    withCredentials: true,
                })
                console.log(res.data.data)
                if (res.data?.success) {
                    setUser(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }
        fetchUser()
    }, [])

    const updateUser = async () => {
        const data = { fullName: user.fullName, email: user.email, gender: user.gender }
        try {
            setbtnDis(true)
            const res = await axios.post("http://localhost:3046/api/v1/users/update", data, {
                withCredentials: true,
            })
            if (res.data?.success == true) {
                toast.success(res.data.message, { autoClose: 1200 })
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Header />

            <div className="account-page blur-overlay flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="contact-overlay"></div>

                <div
                    className="col-12 col-sm-10 col-md-8 col-lg-5 shadow-lg p-4 rounded bg-dark bg-opacity-75"
                    style={{ zIndex: 2 }}
                >
                    <h2 className="mb-4 text-center">Change Details</h2>

                    {loading ? (
                        <div className="w-100">
                            <div className="placeholder-glow w-100 mb-3">
                                <span className="placeholder col-12 rounded py-3"></span>
                            </div>

                            <div className="placeholder-glow w-100 mb-3">
                                <span className="placeholder col-12 rounded py-3"></span>
                            </div>

                            <div className="placeholder-glow w-100 mb-4 d-flex gap-3">
                                <span className="placeholder col-3 rounded py-2"></span>
                                <span className="placeholder col-3 rounded py-2"></span>
                                <span className="placeholder col-3 rounded py-2"></span>
                            </div>

                        </div>
                    ) : (
                        <>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control text-bg-dark"
                                    id="fullName"
                                    value={user.fullName}
                                    placeholder="Name"
                                    required
                                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                />
                                <label htmlFor="user_name" className="text-light">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control text-bg-dark"
                                    id="email"
                                    value={user.email}
                                    placeholder="Email"
                                    required
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                                <label htmlFor="user_email" className="text-light">Email address</label>
                            </div>

                            <div className='mb-2'>
                                <label className='me-2 text-light'>Gender</label>
                            </div>
                            <div className='mb-3'>
                                {["male", "female", "others"].map((g) => (
                                    <div className="form-check form-check-inline" key={g}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value={g}
                                            required
                                            id={g}
                                            checked={user.gender === g}
                                            onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                        />
                                        <label htmlFor={g} className="form-check-label text-light">
                                            {g.charAt(0).toUpperCase() + g.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="mb-2">
                        <button
                            type="submit"
                            className="fw-semibold btn btn-light py-2 px-3 w-100"
                            id="change-btn"
                            onClick={updateUser}
                            disabled={btnDis}
                        >
                            {btnDis ? (
                                <>
                                Changing...
                                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </> 
                            ): (
                                <div className = "d-flex align-items-center justify-content-center gap-3">
                                Change
                                <lord-icon
                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                trigger="hover"
                                stroke="bold"
                                target="#change-btn"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "30px", height: "30px" }}
                            ></lord-icon>
                    </div>
                            )}

                </button>
            </div>

        </div >
            </div >

        <Footer />
        </>
    )
}

export default ChangeDetails
