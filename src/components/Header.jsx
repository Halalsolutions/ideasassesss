import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import axiosInstance from '../api/axios';
import bazeLogo from '../assets/images/logos/baze-logo.png';
import worldBankLogo from '../assets/images/logos/world-bank-logo.png';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');

      await axiosInstance.post(
        '/api/auth/logout/',
        { refresh_token: refreshToken },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers.Authorization = null;
      dispatch(logout());
      navigate('/');
    } catch (err) {
      toast.error('An Error occurred while logging out. Please try again.');
      console.error('Logout error: ', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderNavLinks = () => {
    switch (currentUser?.user.user_type) {
      case 'student':
        return (
          <>
            <NavLink
              to="/my-assessments"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>My Assessments</li>
            </NavLink>
            <NavLink
              to="/my-grades"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>My Grades</li>
            </NavLink>
          </>
        );
      case 'superuser':
        return (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Students</li>
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Teachers</li>
            </NavLink>
            <NavLink
              to="/assessments"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Assessments</li>
            </NavLink>
          </>
        );
      case 'teacher':
        return (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/assessments"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 ${isActive && 'border-b'}`
              }
            >
              <li>Assessments</li>
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="w-full p-4 md:p-6 flex flex-wrap justify-between items-center">
      {/* Logo Section */}
      <div className="flex space-x-2 items-center">
        <img className="h-10 md:h-12" src={bazeLogo} alt="Baze Logo" />
        <h1 className="text-xl md:text-2xl font-semibold">Baze Ideas</h1>
      </div>

      {/* Navigation Links */}
      {isAuthenticated && (
        <ul className="hidden md:flex space-x-4">{renderNavLinks()}</ul>
      )}

      {/* Right Section (Logout or World Bank Logo) */}
      <div className="flex space-x-4 items-center">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex text-white bg-red-400 border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-red-600 rounded"
          >
            {loading ? <ClipLoader size={20} color={'#fff'} /> : 'Logout'}
          </button>
        ) : (
          <img className="h-10 md:h-12" src={worldBankLogo} alt="World Bank Logo" />
        )}
      </div>

      {/* Mobile Nav Links (Visible on small screens) */}
      {isAuthenticated && (
        <ul className="md:hidden w-full mt-4 flex justify-around">{renderNavLinks()}</ul>
      )}
    </header>
  );
}

export default Header;
