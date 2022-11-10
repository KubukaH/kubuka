import { useLocation, Navigate } from "react-router-dom";
import { useCTX } from "../context";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useCTX();

  if (!user) {
    return <Navigate to="/account/signin" state={{ from: location }} replace />;
  }

  return children;

};

export default PrivateRoute; 