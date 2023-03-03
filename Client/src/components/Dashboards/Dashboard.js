import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import classes from "./Dashboard.module.css";
import Grid from "@mui/material/Grid";
import ImageCard from "./ImageCard";

const Dashboard = (props) => { 
  return (
    <React.Fragment>
      <div className={classes.flexcontainer}>
        <div classes={classes.flexitemtop}>
          <NavBar
            adminAccess={props.adminAccess}
            userName={props.userName}
            onimageDetails={props.newimageDetails}
          />
        </div>
        <div className={classes.flexitembottom}>
          <Grid container spacing={4}>
            {props.imageDetails.map((data, index) => (             
                <Grid item md={3}>
                  <ImageCard data={data} />
                </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
