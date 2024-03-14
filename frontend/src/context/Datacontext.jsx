import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const { enqueueSnackbar } = useSnackbar();
  
     
  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(localStorage.getItem("token"));
  };
  const storeIdInLs = (UserId) => {
    localStorage.setItem("id", UserId);
    setUserId(localStorage.getItem("id"));
  };
  const logoutUser = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    return;
  };
  let isLoggedIn = !!token;
  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
        storeTokenInLs,
        logoutUser,
        isLoggedIn,
        storeIdInLs,
        userId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
