import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { getUser } from './store/features/users/userSlice.ts'
import { getLaptop } from './store/features/laptops/laptopSlice.ts'
import Cookies from 'js-cookie'
import  "react-toastify/dist/ReactToastify.css";

const token = Cookies.get('accessToken')

if(token){
  store.dispatch(getUser())
  store.dispatch(getLaptop())
}




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
