import React from 'react';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/" onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
            Logout <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
    </div>
  )
}

export default Logout