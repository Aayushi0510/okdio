import React, { useEffect } from "react";
// library
import { useNavigate } from "react-router-dom";
// constants
import { ROUTES_URL } from "src/constants/url.constant";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate(ROUTES_URL.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
