import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthProtector({ children }) {
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}

export default AuthProtector;
