import { useLocation, Navigate } from "react-router-dom";
import { useCTX } from "../context";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useCTX();

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default PublicRoute;