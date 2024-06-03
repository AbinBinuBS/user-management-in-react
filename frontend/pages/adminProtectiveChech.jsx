import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminProtectiveCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerifiedAdmin = useSelector((state) => state.admin.isVerifiedAdmin);

  useEffect(() => {

    if (!isVerifiedAdmin) {
      console.log("User is not verified. Redirecting to login page.");
      navigate('/admin/login');
    }
  }, [isVerifiedAdmin, location, navigate]);
  return isVerifiedAdmin ? <>{children}</> : null;
};

export default AdminProtectiveCheck;