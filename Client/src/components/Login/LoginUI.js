import React, { useState } from "react";
import * as Components from "./LoginCSS";
import callApi from "../../api/apiCaller";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboards/Dashboard";
import configJson from "../../config/config.json";

// import bcrypt from "bcryptjs";
// import { useNavigate } from "react-router-dom";
// console.log

toast.configure();
const UIComponents = () => {
  const [signIn, setToggle] = useState(true);
  const [name, setName] = useState("");
  const [mailID, setMailID] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setadmin] = useState(false);
  const [imagedetails, setImageDetails] = useState("");

  const signUpOnClickHandler = async (e) => {
    e.preventDefault();
    if (mailID.length === 0 || password.length === 0 || name.length === 0) {
      toast.warn("Invalid UserName/Password/Name...!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (password.length < 5) {
      toast.warn("Password should be minimum 6 digits/letters..!! ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!mailID.includes("@")) {
      toast.warn("MailID not valid ...!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let userRecord = {
        name: name,
        mailid: mailID,
        password: password,
      };
      const response = await fetch(configJson[0].URL + "/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRecord),
      });
      const resMessage = await response.text();
      if (JSON.parse(resMessage).statuscode === 200) {
        toast.success(`Login created...!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setToggle(true);
      } else if (JSON.parse(resMessage).statuscode === 201) {
        toast.warn(`UserName duplictaed...!!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error(`Error occured while creation ...!!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  const signinClickHandler = async (e) => {
    e.preventDefault();
    if (mailID.length === 0 || password.length === 0) {
      toast.warn("Invalid UserName/Password...!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let userData = await callApi(configJson[0].URL + "/users", "get");
      const userName = userData.filter(
        (user) => user.mailid === mailID && user.password === password
      );
      if (userName.length > 0) {
        var imageData = await callApi(configJson[0].URL + "/upload");
        new Promise((resolve, reject) => {
          resolve();
        });
        setImageDetails(imageData);
        setadmin(userName[0].adminuser);
        setName(userName[0].name);
      } else {
        toast.error("Invalid UserName/Password...!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  const ghostbuttonClickhandler = (e, type) => {
    type === "signup" ? setToggle(false) : setToggle(true);
    if (name.length > 0) setName("");
    if (mailID.length > 0) setMailID("");
    if (password.length > 0) setPassword("");
  };

  // <div
  //   style={{
  //     display: "flex",
  //     //  "align-items": "center",
  //     "flex-direction": "column",
  //     padding: "5px 0 0 0",
  //   }}
  // >
  // setPassword(bcrypt.hashSync(e.target.value, 10))
  const passwordClickHandler = (e) => {
    setPassword(e.target.value);
  };

  const imageupdloadHandler = (newimage) => {
    setImageDetails(newimage);
    // setImageDetails((prevImage) => {
    //     return [newimage, ...prevImage];
    //   });
  };

  return (
    <div>
      {imagedetails.length === 0 && (
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Components.Input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setMailID(e.target.value)}
                value={mailID}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Components.Button type="submit" onClick={signUpOnClickHandler}>
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type="email"
                placeholder="Email"
                value={mailID}
                onChange={(e) => setMailID(e.target.value)}
              />
              <Components.Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={passwordClickHandler}
              />
              <Components.Button type="submit" onClick={signinClickHandler}>
                Sign In
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={(e) => ghostbuttonClickhandler(this, "signin")}
                >
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter Your personal details and to start your ratings
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={(e) => ghostbuttonClickhandler(this, "signup")}
                >
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      )}
      {imagedetails.length > 1 && (
        <Dashboard
          imageDetails={imagedetails}
          adminAccess={admin}
          userName={name}
          newimageDetails={imageupdloadHandler}
        />
      )}
    </div>
  );
};
export default UIComponents;
