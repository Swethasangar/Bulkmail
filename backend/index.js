const express = require("express");
const cors = require("cors");
const app = express();
// Install NodeMailer
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// dbpass:yla6xj1cDt2Tk4v1 mongodb+srv://Sandres:<db_password>@cluster0.stepq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// It allows another domain to access.
app.use(cors());
// MiddleWare For Post
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Sandres:yla6xj1cDt2Tk4v1@cluster0.stepq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Not Connected to DB"));

const credential = mongoose.model("credential", {}, "bulkmail");

app.post("/sendemail", (req, res) => {
  var msg = req.body.msg;
  var emailList = req.body.emaillist;

  credential.find().then((data) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });
    new Promise(async (resolve, reject) => {
      try {
        for (var i = 0; i < emailList.length; i++) {
          await transporter.sendMail({
            from: "swethasangar331@gmail.com",
            to: emailList[i],
            subject: "A message from Bulk Mail App",
            text: msg,
          });
          console.log("Email Sent to:" + emailList[i]);
        }
        resolve("Success");
      } catch (error) {
        reject("Failed");
      }
    })
      .then(() => {
        res.send(true);
      })
      .catch(() => {
        res.send(false);
      });
  });
});

// Server
app.listen(5000, () => {
  console.log("Server Started...");
});
