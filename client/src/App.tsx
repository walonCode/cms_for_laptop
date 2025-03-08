import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import RequireAuth from './components/Auth/RequireAuth'
import Hero from './components/Hero'
import LaptopStats from './components/Laptop/LaptopStat'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Auth/Profile'
import LaptopCard from './components/Laptop/LaptopCard'


const sampleLaptop = {
  serialNo: "XYZ12345",
  brand: "Dell",
  model: "XPS 15",
  status: "ASSIGNED",
  allocatedTo: "John Doe",
};

export default function App() {
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<LaptopStats stats={{total: 10, available: 5, assigned: 5, faulty: 0, returned: 0}}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<RequireAuth/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard role="ADMIN"/>}/>
        </Route>
        
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}
