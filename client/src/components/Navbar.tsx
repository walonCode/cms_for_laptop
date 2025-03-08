import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaSignInAlt, FaSignOutAlt, FaRegUserCircle } from 'react-icons/fa';
import { isAuthenticatedState } from "../store/features/users/userSlice";
import { logout } from '../store/features/users/userSlice';
import { useAppSelector,useAppDispatch } from "../hooks/storeHook";
import {LayoutDashboardIcon } from "lucide-react"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAppSelector(isAuthenticatedState)

  const dispatch = useAppDispatch()

  const user ={ 
    username:'walon'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-white text-2xl font-bold">CMS </Link>

        
        <ul className={`hidden md:flex space-x-8 ${isMenuOpen ? 'block' : 'block'}`}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="text-white flex items-center gap-2 hover:text-yellow-400">
                <LayoutDashboardIcon/>Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" className="text-white flex items-center hover:text-yellow-400">
                  <FaUser className="mr-2" /> {user.username}
                </Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())} className="text-white flex items-center hover:text-yellow-400">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white flex items-center hover:text-yellow-400">
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white flex items-center hover:text-yellow-400">
                  <FaRegUserCircle className="mr-2" /> Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        
        <div className="md:hidden" onClick={toggleMenu}>
          <FaBars className="text-white text-2xl" />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link to="/" className="text-white block hover:text-yellow-400">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white  flex items-center hover:text-yellow-400">
                <FaUser className="mr-2" /> {user.username}
              </Link>
              <button onClick={() => dispatch(logout())} className="text-white flex items-center hover:text-yellow-400">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white  flex items-center hover:text-yellow-400">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link to="/register" className="text-white  flex items-center hover:text-yellow-400">
                <FaRegUserCircle className="mr-2" /> Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
