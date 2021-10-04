const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
// const path =require("path");
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "testrun.react",
        pass: "reacttestrun",
    }
});

app.post("/sendmail", (req, res) => {
    const emailData = req.body.emailData;

    const mailOption = {
        to: "megandarkhan@gmail.com",
        from: emailData._replyto,
        subject: emailData.Subject,
        html: `<p>Hi Megandar Khan,:</p>
        <h3>I'm ${emailData.name} and ${emailData.message}</h3>
        <p>Thank You</p>`
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                mes: "Thank you for getting in touch!"
            })
        }
    });
});

// const corsOptions = {
//     origin: function (origin, callback) {
//       console.log("** Origin of request " + origin)
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//         console.log("Origin acceptable")
//         callback(null, true)
//       } else {
//         console.log("Origin rejected")
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'portfolio/build')));
//   // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, 'portfolio/build', 'index.html'));
//     });
//   }

app.listen(3001, () => {
    console.log("connected");
})