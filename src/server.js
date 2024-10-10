// server.js
const express = require("express");
const nodemailer = require("nodemailer");
// const Imap = require("node-imap");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// // IMAP email server settings
// const imap = new Imap({
//   user: "myacreatives82@gmail.com",
//   password: "vmdlsafsrsbrkmnp",
//   host: "imap.gmail.com",
//   port: 993,
//   tls: {
//     rejectUnauthorized: false,
//   },
//   tlsOptions: {
//     rejectUnauthorized: false,
//   },
// });

// // Connect to the IMAP email server
// imap.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected to IMAP email server");
//   }
// });

// // Fetch new emails
// imap.on("ready", () => {
//   imap.openBox("INBOX", true, (err, mailbox) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Opened INBOX");
//       imap.search([["UNSEEN"]], (err, results) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Found " + results.length + " new emails");
//           results.forEach((id) => {
//             imap.fetch(id, { headers: true, body: true }, (err, message) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log("Received email from " + message.from);
//                 // Process the email message here
//                 const email = {
//                   from: message.from,
//                   subject: message.subject,
//                   body: message.body,
//                 };
//                 // Send the email to the Vue app
//                 app.post("/email", (req, res) => {
//                   res.json(email);
//                 });
//               }
//             });
//           });
//         }
//       });
//     }
//   });
// });

// imap.on("error", (err) => {
//   console.log("IMAP error:", err);
// });

app.post("/api/send-email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      // user: "officeworkweblarenzo@gmail.com",
      // pass: "aycukdcpszinonxm",
      user: "myacreatives82@gmail.com",
      pass: "vmdlsafsrsbrkmnp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const toEmails = req.body.to;
  toEmails.forEach((email) => {
    // Send email to each recipient using the email address
    transporter.sendMail(
      {
        // from: "officeworkweblarenzo@gmail.com",
        from: "myacreatives82@gmail.com",
        to: email,
        subject: req.body.subject,
        text: req.body.body,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent to ${email}`);
        }
      }
    );
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
