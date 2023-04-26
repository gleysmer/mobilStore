const { Router } = require("express")
const {Contactus} = require("../db")
const nodemailer = require("nodemailer")

const router = Router();

router.post("/", async(req,res)=>{

  try{

    const { email, subject, message } = req.body;

    // Configura el transportador de correo electrónico con tus credenciales de correo electrónico

    const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_PHONEZONE,
      pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
    }});

    await transporter.sendMail({
        from:  '"PHONEZONE" <phonezonestoreapp@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `${subject}`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
            <h1>¡Gracias por contactarnos!</h1>
            <h1>Gracias por comunicarse con nosotros. Estaremos revisando su mensaje. 😉</h1>
            <h3>Este es su mensaje: ${message}</h3>
        </body>
        </html>`, // html body
    }); 


       await transporter.sendMail({
          from: email, // sender address
          to: "phonezonestoreapp@gmail.com" , // list of receivers
          subject: `Mensaje!`, // Subject line
          html: `<!DOCTYPE html>
          <html>
          <body>
          <h1>¡Hola! Somos PHONEZONE, ya leímos tu consulta
          y te daremos una respuesta prontamente! ¡Saludos! </h1>
          </body>
          </html>`, // html body
        });


      res.status(201).send({message: 'The email was sent successfully'});
    } catch (error) {
      console.log(error)
    }
})
module.exports = router;