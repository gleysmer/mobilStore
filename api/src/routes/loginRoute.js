const { Router } = require("express");
const { User } = require("../db");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const router = Router();

// Configura el transportador de correo electrónico con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_PHONEZONE,
    pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
  },
});

router.post("/", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email },
  });

  if(!user){
    return res.status(401).send({ message: 'Email or Password is invalid'})
  }

  if(!user.enabled){
    return res.status(401).send({message: 'You are banned, please contact us for support.'})
  }

  if (!user || !user.password)
    return res.status(401).send({ message: "Email or Password is invalid" });

  if (bcrypt.compareSync(password, user.password)) {
    
    const mailOptions = {
      from: "phonezonestoreapp@gmail.com",
      to: user.email,
      subject: `¡Bienvenido! ${user.name}`,
      html: `
               <h1>PhoneZone Store</h1>
               <br>
               <p> Hola ${user.name}, gracias por unirte a phoneZone tu tienda online, esperamos que tu estancia sea excelente.</p>
               <br>
               <small>
               PHONEZONESTORE
              </small>
               `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });

    return res.status(200).json({
      message: "You have been successfully validated",
      data: {
        ...user,
        token: generateToken(user),
      },
    });
  } else return res.status(401).send({ message: "Email or Password is invalid" });
});

module.exports = router;
