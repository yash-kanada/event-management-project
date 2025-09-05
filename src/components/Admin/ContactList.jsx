import React, { useEffect, useState } from 'react'
import AdminSlidebar from './AdminSlidebar'
import axios from 'axios'
import { toast } from 'react-toastify'

function ContactList() {

    const [data, setdata] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3046/api/v1/contact/allmessage", {
                    withCredentials: true, // Important for cookies (auth)
                })
                console.log(res)
                setloading(true)
                if (res.data?.success == true) {
                    toast.success(res.data.message, { autoClose: 1200 })
                    setdata(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }finally{
                setloading(false)
            }
        }


        fetchData()

    }, [])


    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 col-lg-3 mb-3 mb-lg-0">
                    <AdminSlidebar />
                </div>

                <div className="col-12 col-lg-9">
                    <div className="p-3">
                       
    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h2 className="text-white mb-0">Contact List</h2>

                        <div className="input-group w-50">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by user name, email, phone no, message..."
                                value={searchTerm}
                                id='searchTerm'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="input-group-text"><i className="bi bi-search"></i></span>
                        </div>
                    </div>
                       
                        <div className="table-responsive">
                            <table className="table table-dark table-hover align-middle text-center">
                                <thead className="table-light text-dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone No</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        // Show 5 placeholder rows
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i} className='placeholder-glow'>
                                                <td>
                                                    <span className="placeholder col-3 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-6 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-6 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-4 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                                <td>
                                                    <span className="placeholder col-8 rounded bg-secondary">&nbsp;</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        data.filter( e =>
                                            e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            e.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase())||
                                            e.message?.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).reverse().map((c, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{c.fullName}</td>
                                                <td>{c.email}</td>
                                                <td>{c.mobile_no}</td>
                                                <td>{c.message}</td>
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
    )
}

export default ContactList
