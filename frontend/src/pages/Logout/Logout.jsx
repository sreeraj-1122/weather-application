import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { DataContext } from "../../context/Datacontext";


 const Logout = () => {
    const {logoutUser}=useContext(DataContext);
  useEffect(()=>{
    logoutUser();
  },[logoutUser])

  return <Navigate to='/'/>
};

export default Logout;