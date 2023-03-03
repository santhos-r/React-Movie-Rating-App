import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Rating,
} from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
import configJson from "../../config/config.json";

const ImageCard = (props) => {
  const [value, setValue] = useState(props.data.rating);

  const handleStarRating = async (e, newValue) => {
    setValue(newValue);
    let rating = {
      imageName: props.data.imagename,
      rating: newValue,
    };
    await fetch(configJson[0].URL + "/upload/rating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rating),
    });
  };

  return (
    <div>
      <Card key={props.data.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="250"
          // image={img1}
          image={configJson[0].URL + `/uploads/${props.data.imagename}`}
          alt="Cinema"
        />
        {/* <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.data.imagename}
          </Typography>
        </CardContent> */}
        <Rating
          name="simple-controlled"
          max={10}
          precision={0.5}
          value={value}
          onChange={(e, newValue) => {
            handleStarRating(this, newValue);
          }}
          emptyIcon={<StarBorder sx={{ color: "rgba(255,255,255,0.8" }} />}
        />
        {/* <CardActions disableSpacing></CardActions> */}
      </Card>
    </div>
  );
};

export default ImageCard;
