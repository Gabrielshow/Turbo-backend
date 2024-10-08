// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const Imap = require("imap");

const app = express();

// IMAP email server settings
const imap = new Imap({
  user: "myacreatives82@gmail.com",
  password: "vmdlsafsrsbrkmnp",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

// Connect to the IMAP email server
imap.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to IMAP email server");
  }
});

// Fetch new emails
imap.on("ready", () => {
  imap.openBox("INBOX", true, (err, mailbox) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Opened INBOX");
      imap.search([["UNSEEN"]], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Found " + results.length + " new emails");
          results.forEach((id) => {
            imap.fetch(id, { headers: true, body: true }, (err, message) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Received email from " + message.from);
                // Process the email message here
                const email = {
                  from: message.from,
                  subject: message.subject,
                  body: message.body,
                };
                // Send the email to the Vue app
                app.post("/email", (req, res) => {
                  res.json(email);
                });
              }
            });
          });
        }
      });
    }
  });
});

app.post("/api/send-email", (req, res) => {
  const mail = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: "myacreatives82@gmail.com",
      pass: "vmdlsafsrsbrkmnp",
    },
  });
  const mailOptions = {
    from: "myacreatives82@gmail.com",
    to: mail.to,
    subject: mail.subject,
    text: mail.body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
    res.json({ message: "Email sent successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
