import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboards/Dashboard";
import LoginUI from "./components/Login/LoginUI";

const App = (props) => {
  const [imageDetails, setImageDetails] = useState("");
  const [adminaccess, setadminaccess] = useState("");
  const [userName, setuserName] = useState("");

  const imageDatahandle = (details) => {
    console.log("details", details);
    setImageDetails(details);
  };

  const adminhandler = (admin) => {
    console.log("details", admin);
    setadminaccess(admin);
  };

  const nameHandler = (user) => {
    console.log("details", user);
    setuserName(user);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LoginUI
              imageData={imageDatahandle}
              adminaccess={adminhandler}
              userName={nameHandler}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              imageDetails={imageDetails}
              adminAccess={adminaccess}
              userName={userName}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
