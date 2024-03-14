import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Indexpage from "./pages/Home/Indexpage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Logout from "./pages/Logout/Logout";
import Saveweather from "./pages/save weather/Saveweather";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Indexpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/saved" element={<Saveweather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
