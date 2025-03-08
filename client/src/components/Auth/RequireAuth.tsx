import { useLocation,Navigate,Outlet } from "react-router-dom";
import  Cookies  from "js-cookie"




export default function RequireAuth() {
  const location = useLocation()

  return(
    Cookies.get("accessToken") ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>
  )
}
