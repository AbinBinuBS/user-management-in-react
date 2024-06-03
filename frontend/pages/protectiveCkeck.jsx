import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectiveCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerifiedUser = useSelector((state) => state.user.isVerifiedUser);

  useEffect(() => {

    if (!isVerifiedUser) {
      console.log("User is not verified. Redirecting to login page.");
      navigate('/');
    }
  }, [isVerifiedUser, location, navigate]);
  return isVerifiedUser ? <>{children}</> : null;
};

export default ProtectiveCheck;
