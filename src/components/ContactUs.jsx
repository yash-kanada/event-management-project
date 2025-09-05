import { useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function ContactUs() {

  const [fullName, setfullName] = useState()
  const [email, setemail] = useState()
  const [mobile_no, setmobile_no] = useState()
  const [message, setmessage] = useState()
   const [btnDis, setbtnDis] = useState(false)
  const navigate = useNavigate()

  const func = async () => {

    const data = { fullName, email, mobile_no, message }

    try {
      setbtnDis(true)
      const res = await axios.post("http://localhost:3046/api/v1/contact/sendmessage",data)
      console.log("Response : ",res)
      if(res.data?.success == true){
        toast.success(res.data.message,{autoClose:2000})
        navigate('/contactus')
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }catch(error){
      toast.error(error.message)
    }finally{
      setbtnDis(false)
    }
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div className="contact-section d-flex justify-content-center align-items-center text-white flex-grow-1">
          <div className="contact-overlay"></div>

          <div
            className="col-12 col-sm-10 col-md-8 col-lg-5  p-4 rounded contact-form bg-transparent"
          >
            <h2 className="mb-4 text-center text-light">Get in Touch</h2>

            <div className="form-floating mb-3">
              <input type="text" className="form-control text-bg-dark" name="name" id="cont_name" placeholder="Name" required onChange={(e)=>setfullName(e.target.value)} />
              <label htmlFor="cont_name" className="text-light">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control text-bg-dark" name="email" id="cont_email" placeholder="Email" required onChange={(e)=>setemail(e.target.value)} />
              <label htmlFor="cont_email" className="text-light">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="tel" className="form-control text-bg-dark" name="phone" id="cont_phone" placeholder="Phone" required onChange={(e)=>setmobile_no(e.target.value)} />
              <label htmlFor="cont_phone" className="text-light">Phone No</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control text-bg-dark " name="message" id="cont_msg" placeholder="Message" style={{ height: "100px", whiteSpace: "pre-wrap", overflowY: "auto" }} required onChange={(e)=>setmessage(e.target.value)} />
              <label htmlFor="cont_msg" className="text-light">Message</label>
            </div>

            <div className="mb-2">
              <button  className="fw-semibold btn btn-light py-2 px-3 w-100 "disabled={btnDis}  id="send-btn" onClick={func}>
                {btnDis ? (
                <>
                  Sending...
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>
              ) : (
               <div className="d-flex align-items-center justify-content-center gap-3">
                  Send
                  <lord-icon
                    src="https://cdn.lordicon.com/vpbspaec.json"
                    trigger="hover"
                    stroke="bold"
                    target="#send-btn"
                    colors="primary:#000000"
                    style={{ width: "30px", height: "30px" }}
                  ></lord-icon>
                </div>
              )}
              </button>
            </div>
          </div>
        </div>

        <Footer className="mb-0" />
      </div>
    </>
  )
}

export default ContactUs
