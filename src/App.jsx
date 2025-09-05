import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './components/Home'
import About from './components/About'
import EventsCat from './components/Event/EventsAllCat'
import Events from './components/Event/Events'
import EventDetail from './components/Event/EventDetail'
import Gallery from './components/Gallary/Gallary'
import GalleryDetail from './components/Gallary/GallaryByCat'
import ContactUs from './components/ContactUs'
import Login from './components/Login'
import Signup from './components/SingUp'
import Account from './components/User/Account'
import ChangeDetails from './components/User/ChangeDetails'
import ChangePw from './components/User/ChangePW'
import MyBooking from './components/User/MyBooking'
import ForgotPW from './components/ForgotPW'
import AdminLogin from './components/Admin/AdminLogin'
import AdminRegister from './components/Admin/AdminRegister'
import Admin from './components/Admin/Admin'
import AllEvents from './components/Admin/Event/AllEvents'
import PostEvent from './components/Admin/Event/PostEvent'
import UpdateEvent from './components/Admin/Event/UpdateEvent'
import PostCat from './components/Admin/Category/PostCat'
import UpdateCat from './components/Admin/Category/UpdateCat'
import AddGallary from './components/Admin/AddGallary'
import ContactList from './components/Admin/ContactList'
import AdminProfile from './components/Admin/Admin profile/AdminProfile'
import AdminPw from './components/Admin/Admin profile/AdminPw'
import AllCategory from './components/Admin/Category/AllCat'
import { ToastContainer } from 'react-toastify'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='events-all-cat' element={<EventsCat/>}></Route>
          <Route path='events/:cat_id' element={<Events/>} ></Route>
          <Route path='event-detail/:event_id' element={<EventDetail/>} ></Route>
          <Route path='gallary' element={<Gallery/>} ></Route>
          <Route path='gallary/:cat_id' element={<GalleryDetail/>} ></Route>
          <Route path='contactus' element={<ContactUs/>} ></Route>
          <Route path='login' element={<Login/>} ></Route>
          <Route path='signup' element={<Signup/>} ></Route>
          <Route path='account' element={<Account/>} ></Route>
          <Route path='change-user-detail' element={<ChangeDetails/>} ></Route>
          <Route path='change-user-password' element={<ChangePw/>} ></Route>
          <Route path='my-booking' element={<MyBooking/>} ></Route>
          <Route path='forgot-password' element={<ForgotPW/>} ></Route>
          <Route path='admin/login' element={<AdminLogin/>} ></Route>
          <Route path='admin/register' element={<AdminRegister/>} ></Route>
          <Route path='admin' element={<Admin/>} ></Route>
          <Route path='admin/all-events' element={<AllEvents/>} ></Route>
          <Route path='admin/post-event' element={<PostEvent/>} ></Route>
          <Route path='admin/update-event/:event_id' element={<UpdateEvent />} ></Route>
          <Route path='admin/all-category' element={<AllCategory/>} ></Route>
          <Route path='admin/post-category' element={<PostCat/>} ></Route>
          <Route path='admin/update-category/:cat_id' element={<UpdateCat/>} ></Route>
          <Route path='admin/add-gallary' element={<AddGallary/>} ></Route>
          <Route path='admin/contacts' element={<ContactList/>} ></Route>
          <Route path='admin/change-profile' element={<AdminProfile/>} ></Route>
          <Route path='admin/change-password' element={<AdminPw/>} ></Route>
        </Routes>
        {/* for toast message */}
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
