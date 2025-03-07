import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaSignInAlt, FaSignOutAlt, FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = true
  const user ={ 
    username:'walon'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo or Site Name */}
        <Link to="/" className="text-white text-2xl font-bold">MySite</Link>

        {/* Desktop Links */}
        <ul className={`hidden md:flex space-x-8 ${isMenuOpen ? 'block' : 'block'}`}>
          <li>
            <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile" className="text-white flex items-center hover:text-yellow-400">
                  <FaUser className="mr-2" /> {user.username}
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-white flex items-center hover:text-yellow-400">
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
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
                <Link to="/signup" className="text-white flex items-center hover:text-yellow-400">
                  <FaRegUserCircle className="mr-2" /> Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={toggleMenu}>
          <FaBars className="text-white text-2xl" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link to="/" className="text-white block hover:text-yellow-400">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white block flex items-center hover:text-yellow-400">
                <FaUser className="mr-2" /> {user.username}
              </Link>
              <Link to="/logout" className="text-white block flex items-center hover:text-yellow-400">
                <FaSignOutAlt className="mr-2" /> Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white block flex items-center hover:text-yellow-400">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link to="/signup" className="text-white block flex items-center hover:text-yellow-400">
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
