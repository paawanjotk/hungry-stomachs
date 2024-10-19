import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
export const LoggedInProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (user === null) {
    return <Navigate to={"/login"} />;
  }

  if (loading || user === undefined) {
    return <LoadingSpinner />;
  }

  return <div>{children}</div>;
};

export const LoggedOutProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1); // Navigates to the previous URL if it exists
      } else {
        navigate("/"); // Navigates to the home page if no previous history
      }
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>{children}</div>;
};
