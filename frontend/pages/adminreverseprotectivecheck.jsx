import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminReverseProtectiveCheck = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerifiedAdmin = useSelector((state) => state.admin.isVerifiedAdmin);

  useEffect(() => {
    if (isVerifiedAdmin) {
      console.log("Admin is verified. Redirecting to admin dashboard.");
      navigate('/admindashboard'); 
    }
  }, [isVerifiedAdmin, location, navigate]);

  return !isVerifiedAdmin ? <>{children}</> : null;
};

export default AdminReverseProtectiveCheck;
