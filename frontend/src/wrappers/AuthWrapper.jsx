import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../http/users";
import { setUser } from "../components/AuthSlice";

const AuthWrapper = ({ children }) => {
  let dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // user is authenticated
        // dispatch an action to set the user
        try {
          const { result } = await getUser(token);
          
          dispatch(setUser(result));
        } catch (error) {
          localStorage.removeItem("token");
          dispatch(setUser(null));
        }
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
