import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import RequireAuth from './components/Auth/RequireAuth'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Auth/Profile'
import AddLaptop from './components/Laptop/AddLaptop'




export default function App() {
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Hero/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<RequireAuth/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard role='ADMIN' />}/>
          <Route path='/add_laptop' element={<AddLaptop/>}/>
        </Route>
        
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}
