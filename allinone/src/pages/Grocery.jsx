import React from 'react'
import { useAuth } from '../context/authContext/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Grocery = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (!user) {
      navigate("/login", {
        state: { from: location }
      });
      return;
    }}

  return (
    <div>
      Grocery
    </div>
  )
}

export default Grocery
