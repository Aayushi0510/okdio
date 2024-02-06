import { Navigate, useLocation } from "react-router-dom";
// utils
import { getSessionState, StoredVariables } from "src/utils";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const isAuthenticated = getSessionState(StoredVariables.authToken);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
export default PrivateRoute;
