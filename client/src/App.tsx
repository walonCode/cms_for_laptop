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
import { userState } from './store/features/users/userSlice'
import { useAppSelector } from './hooks/storeHook'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { getUser } from './store/features/users/userSlice.ts'
import { getLaptop } from './store/features/laptops/laptopSlice.ts'
import store from './store/store.ts'




export default function App() {
  

  const token = Cookies.get('accessToken')

  useEffect(() => {
    if (token) {
      store.dispatch(getUser())
      store.dispatch(getLaptop())
    }
  },[token])

  const user = useAppSelector(userState)
  console.log(user?.role)
  
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
          <Route path='/dashboard' element={<Dashboard role={user?.role} />}/>
          <Route path='/add_laptop' element={<AddLaptop/>}/>
        </Route>
        
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}
