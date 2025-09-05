import { useEffect, useRef, useState } from 'react';
import AdminSlidebar from './AdminSlidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

function Admin() {

    const [data, setdata] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [loading, setloading] = useState(true)
    const [BtnDis, setBtnDis] = useState(false)


    useEffect(() => {

        const savedScroll = sessionStorage.getItem('scrollPosition')
        if (savedScroll !== null) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll))
                // console.log("scrollposition", savedScroll)
                sessionStorage.removeItem('scrollPosition')
            }, 500);
        }

        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3046/api/v1/admin/getalluser", {
                    withCredentials: true,
                })
                console.log(res.data)
                setloading(true)
                if (res.data?.success == true) {
                    setdata(res.data.data)
                    // toast.success(res.data.message, { autoClose: 1200 })
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [])

    const func = async (_id) => {
        try {
            const res = await axios.post("http://localhost:3046/api/v1/admin/blockandunblockuser", { _id }, {
                withCredentials: true,
            })
            setBtnDis(true)
            if (res.data?.success == true) {
                toast.success(res.data.message, { autoClose: 1000 })
                const scrollY = window.scrollY
                setTimeout(() => {
                    console.log("Saved scrollY:", window.scrollY);
                    sessionStorage.setItem('scrollPosition', scrollY)
                    window.location.reload()
                }, 1000);
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
            <div className="row">

                <div className="col-12 col-lg-3 mb-3 mb-lg-0">
                    <AdminSlidebar />
                </div>


                <div className="col-12 col-lg-9">
                    <div className="p-3">
                        <h2 className="text-white mb-4">User List</h2>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                       
                            <div className="d-flex gap-2 mb-0">
                                <button className="btn btn-outline-light" onClick={() => setSearchTerm('')}>
                                    All
                                </button>
                                <button className="btn btn-outline-danger" onClick={() => setSearchTerm('block')}>
                                    Blocked
                                </button>
                                <button className="btn btn-outline-success" onClick={() => setSearchTerm('unblock')}>
                                    Unblocked
                                </button>
                            </div>

                            <div className="input-group" style={{ maxWidth: '400px', width: '100%' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by user name, email, gender, phone no...."
                                    value={searchTerm}
                                    id="searchTerm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-dark  table-hover align-middle text-center">
                                <thead className="table-light text-dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Phone No</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i} className='placeholder-glow'>
                                                <td>
                                                    <span className="placeholder col-3 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <div className="placeholder rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-6 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-7 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-5 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-4 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-6 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        data.filter(e =>
                                            e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            e.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            String(e.mobile_no)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            String(e.block)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            searchTerm.toLowerCase() === "block" && e.block === true ||
                                            searchTerm.toLowerCase() === "unblock" && e.block === false
                                        ).reverse().map((user, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <img
                                                        src={user.avatar}
                                                        alt="profile"
                                                        width="40"
                                                        height="40"
                                                        className="rounded-circle object-fit-cover"
                                                    />
                                                </td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.gender}</td>
                                                <td>{user.mobile_no}</td>
                                                <td>
                                                    <button
                                                        className={`btn btn-sm ${user.block ? 'btn-success' : 'btn-danger'}`}
                                                        onClick={() => func(user._id)}
                                                        disabled={BtnDis}
                                                    >
                                                        {BtnDis ? 'Processing...' : user.block ? 'Unblock' : 'Block'}
                                                    </button>
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
        </div>
    );
}

export default Admin;
