const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (email, verificationToken) => {
  return {
    to: `${email}`,
    from: "tomasz.mazur87@gmail.com",
    subject: "ContactBook by Tomasz M User Verification",
    text: `To verify Your account at ContactBook by Tomasz M just click link below http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<body style="font-family: sans-serif; text-align: center;">
              <h1 style="color: rgb(126, 164, 245); margin-top: 80px;">&#128214; ContactBook by Tomasz M &#128214;</h1>
              <p style="font-size: 20px; margin-top: 50px;">To verify Your user account at <em style="color: rgb(126, 164, 245);">ContactBook by Tomasz M</em> just click button below</p>
              <a href="http://localhost:3000/api/users/verify/${verificationToken}"><button style="width: 380px; height: 80px; font-size: 20px; border-radius: 30px; background-color: rgb(199, 238, 238); margin-top: 50px; ">VERIFY EMAIL &#9989;</button><a/>
              <p style="font-size: 10px;margin-top: 50px; color: rgb(126, 164, 245);">Or just copy this link to Your browser: http://localhost:3000/api/users/verify/${verificationToken}</p>
        </body>`,
  };
};

const sendMail = (email, verificationToken) => {
  sgMail
    .send(msg(email, verificationToken))
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { sendMail };
