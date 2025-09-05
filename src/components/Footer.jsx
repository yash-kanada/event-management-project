import React from 'react'

function Footer() {
    return (
        <>

            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-1 border-top bg-dark">
                <div className="col-md-4 d-flex align-items-center ms-1 ms-md-3">
                    <p className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap">
                       <lord-icon
                                src="https://cdn.lordicon.com/lovvjejj.json"    
                                trigger="hover"
                                stroke = "bold"
                                style={{ width: "40px", height: "40px" }}>
                            </lord-icon>
                    </p>
                    <span className="mb-2 mb-md-0 text-white">© 2025 The Event Box</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-1 me-md-3">
                    <li className="ms-3" >
                        <a href="#">
                            <lord-icon
                                src="https://cdn.lordicon.com/tgyvxauj.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="#">
                            <lord-icon
                                src="https://cdn.lordicon.com/bfoumeno.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="#">
                            <lord-icon
                                src="https://cdn.lordicon.com/qgebwute.json"
                                trigger="hover"
                                stroke="bold"
                                state="hover-draw"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="#">
                            <lord-icon
                                src="https://cdn.lordicon.com/rbsqvtgo.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                        </a>
                    </li>
                </ul>
            </footer>

        </>
    )
}

export default Footer
