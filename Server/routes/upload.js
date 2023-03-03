var express = require("express");
var router = express.Router();
const imageJson = require("../public/Data/image.json");

//multer Upload
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

var type = upload.single("avatar");

function dynamicSort(property) {
  return function (a, b) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
}

router.get("/", function (req, res, next) {
  res.send(JSON.stringify(imageJson));
});

router.post("/", type, function (req, res) {
  const file = req.file;
  const data = req.body;
  const DuplicateImage = imageJson.filter(
    (image) => image.imagename === file.originalname
  );
  if (DuplicateImage.length > 0) {
    res.status(200).send(
      JSON.stringify({
        statuscode: 201,
        message: file.originalname + " already exists",
      })
    );
  } else {
    let newImage = [
      ...imageJson,
      {
        id: imageJson.length + 1,
        imagename: file.originalname,
        uploadeddate: "2023-02-04T09:17:31.656Z",
        rating: 3,
      },
    ];
    try {
      fs.writeFile(
        "./public/Data/image.json",
        JSON.stringify(newImage),
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666,
        },
        (err) => {
          if (err) console.log(err);
          else {
            res.status(200).send(
              JSON.stringify(
                newImage
                //     {
                //     statuscode: 200,
                //     message: file.originalname + " added successfully",
                //   }
              )
            );
          }
        }
      );
    } catch (err) {
      JSON.stringify({
        statuscode: err.statuscode,
        message: err.message,
      });
      console.log("error", err);
    }
  }

  //   return res.status(200).send("file upload success");
});

router.post("/rating", function (req, res, next) {
  try {
    const currentData = req.body;
    const CurrentimageData = imageJson.filter(
      (image) => image.imagename === currentData.imageName
    );
    const existingimageData = imageJson.filter(
      (image) => image.imagename !== currentData.imageName
    );
    CurrentimageData[0].rating = currentData.rating;
    const newArrayList = [...existingimageData, ...CurrentimageData];
    newArrayList.sort((a, b) => a.id - b.id);

    // Image Array Update
    try {
      fs.writeFile(
        "./public/Data/image.json",
        JSON.stringify(newArrayList),
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666,
        },
        (err) => {
          if (err) console.log(err);
          else {
            res.status(200).send(
              JSON.stringify({
                statuscode: 200,
                message: newArrayList.imagename + " rate updated successfully",
              })
            );
          }
        }
      );
    } catch (err) {
      JSON.stringify({
        statuscode: err.statuscode,
        message: err.message,
      });
      console.log("error", err);
    }
  } catch (err) {
    console.log("message", err.message);
  }

});

module.exports = router;
