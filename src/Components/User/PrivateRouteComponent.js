import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userLoginStatus = localStorage.getItem('userLoginStatus');
  const location = useLocation();

  return userLoginStatus === 'true'
    ? children
    : <Navigate to="" state={{ from: location }} />;
};

export default PrivateRoute;