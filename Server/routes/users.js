var express = require("express");
var router = express.Router();
const userJson = require("../public/Data/users.json");
var fs = require("fs");

// UserList Display
router.get("/", function (req, res, next) {
  res.send(userJson);
});

// User Creation
router.post("/", function (req, res, next) {
  var data = req.body;
  // UserID Validation
  const DuplicateMailID = userJson.filter(
    (user) => user.mailid === data.mailid
  );
  if (DuplicateMailID.length) {
    res.status(200).send(
      JSON.stringify({
        statuscode: 201,
        message: data.mailid + " already exists",
      })
    );
  } else {
    let newUser = [
      ...userJson,
      {
        name: data.name,
        mailid: data.mailid,
        password: data.password,
        adminuser: false,
        createdDate: new Date(),
      },
    ];
    try {
      fs.writeFile(
        "./public/Data/users.json",
        JSON.stringify(newUser),
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
                message: data.mailid + " added successfully",
              })
            );
          }
        }
      );
    } catch (err) {
      console.log("error", err);
    }
  }
});

module.exports = router;
