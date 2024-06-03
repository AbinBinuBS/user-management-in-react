

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ReverseProtectiveCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerifiedUser = useSelector((state) => state.user.isVerifiedUser);

  useEffect(() => {
    if (isVerifiedUser) {
      console.log("User is verified. Redirecting to home page.");
      navigate('/home'); 
    }
  }, [isVerifiedUser, location, navigate]);

  return !isVerifiedUser ? <>{children}</> : null;
};

export default ReverseProtectiveCheck;
