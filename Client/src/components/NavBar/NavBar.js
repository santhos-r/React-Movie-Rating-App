import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/MovieCreationTwoTone";
import classes from "./NavBar.module.css";
import Upload from "../Upload/Upload";
import configJson from "../../config/config.json";
import { toast } from "react-toastify";

const NavBar = (props) => {
  const [showModal, setshowModal] = useState(false);
  const [file, setFile] = useState("");

  const onHideModal = (props) => {
    setshowModal(false);
  };

  const uploadHandler = async (e) => {
    let newfile = file[0];
    let form = new FormData();
    form.append("avatar", newfile);
    console.log("configJson", configJson[0].URL);
    const response = await fetch(configJson[0].URL + "/upload", {
      method: "POST",
      body: form,
    });
    const resMessage = await response.text();
    if (JSON.parse(resMessage).statuscode === 201) {
      toast.warn(`File duplictaed...!!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.success(`File uploaded...!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setshowModal(false);
      props.onimageDetails(JSON.parse(resMessage));
    }
  };

  const signoutClickHandler = (e) => {
    console.log("Load Login");
    // navigate("/")
    window.location.pathname = "/";
    console.log("Load out");
  };

  return (
    <div>
      {!showModal && (
        <AppBar className={classes.header}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <CatchingPokemonIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hello {`${props.userName}`}
            </Typography>
            <Stack direction="row" spacing={2}>
              {props.adminAccess && (
                <Button
                  className={classes.button}
                  color="inherit"
                  onClick={() => setshowModal(true)}
                >
                  Upload
                </Button>
              )}
              <Button
                className={classes.button}
                color="inherit"
                onClick={signoutClickHandler}
              >
                SignOut
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      )}
      {showModal && (
        <Upload onClose={onHideModal}>
          <div className={classes.span}>
            <span>
              <input
                type="file"
                name="avatar"
                onChange={(e) => setFile(e.target.files)}
              ></input>
            </span>
          </div>
          <div className={classes.actions}>
            <button className={classes.button} onClick={onHideModal}>
              Close
            </button>
            <button className={classes.button} onClick={uploadHandler}>
              Upload
            </button>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default NavBar;
