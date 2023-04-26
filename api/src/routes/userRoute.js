const { Router } = require("express");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const URI = "http://localhost:3001/user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_PHONEZONE,
    pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
  },
});
// Importar todos los routers;

router.get("/", async (req, res) => {
  const { email, name } = req.query;

  try {
    const users = await User.findAll();
    if (name) {
      let result = users.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      result.length
        ? res.status(200).send(result)
        : res.status(404).send("name not found");
    } else if (email) {
      const users = await User.findAll({
        where: {
          email: {
            [Op.like]: `${email}%`,
          },
        },
      });
      users.length > 0
        ? res.status(200).send(users)
        : res.status(400).send(`User ${email} not found`);
    } else {
      const users = await User.findAll();
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, surname, password, email, image } = req.body;

    const validate = await User.findOne({
      where: {
        email: email,
      },
    });

    if (validate) {
      return res
        .status(400)
        .send({ message: "User or Email already registered" });
    }

    let lastUserId = await User.findOne({
      order: [["createdAt", "DESC"]], // Ordena por la fecha de creación de manera descendente para obtener el último usuario creado
    });
    let lastId;
    if(lastUserId){ 
     lastId = lastUserId.id + 1;
    }else{ 
      lastId = 1
    }
    // console.log("lastUserId es: ", lastUserId)
    const newUser = await User.create({
      id: lastId,
      name,
      surname,
      password: bcrypt.hashSync(password, 8),
      email,
      image,
    });

    if (!newUser) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const token = jwt.sign({ email }, "secret");

    return res.status(200).send({ message: "User registered", token });
  } catch (error) {
    console.log("error es: ", error);
    res.status(400).json({ error: error.message });
  }
});

// cambio de contraseña

// router.post('/forgotPassword', async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email: email } });
//     if (!user) {
//       return res.status(400).json({ msg: 'No user with that email exists.' });
//     }

// Genera un token de restablecimiento de contraseña
// const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '15m' });

// Envía un correo electrónico al usuario con el token de restablecimiento de contraseña
// const mailOptions = {
//   from: "phonezonestoreapp@gmail.com",
//   to: user.email,
//   subject: 'Restablecimiento de contraseña',
//   text: `Para restablecer su contraseña, haga clic en el siguiente enlace: http://localhost:3001/user/resetPassword/${token}`
// };
// await transporter.sendMail(mailOptions);

//     res.json({ msg: "Email has been sent with instructions to reset your password." });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

router.post("/passwordCode", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({
          message: "No se encontró ningún usuario con ese correo electrónico.",
        });
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordCode = confirmationCode;
    await user.save();
    const mailOptions = {
      from: "phonezonestoreapp@gmail.com",
      to: user.email,
      subject: "Cambio de contraseña",
      text: `Su código de confirmación es: ${confirmationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "A confirmation code has been sent to your email." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ocurrió un error al procesar su solicitud." });
  }
});

router.post("/resetPassword", async (req, res) => {
  const { email, code, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not user found with that email." });
    }

    // Verificar que el código proporcionado por el usuario coincide con el código enviado por correo electrónico
    if (code !== user.resetPasswordCode) {
      return res
        .status(400)
        .json({ message: "The confirmation code is invalid." });
    }

    user.password = bcrypt.hashSync(password, 8);
    await user.save();

    // Generar y enviar token de autenticación al cliente

    res.json({ message: "Your password has been successfully changed." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ocurrió un error al procesar su solicitud." });
  }
});

router.put("/resetPassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const passwordHash = await bcrypt.hash(password, 10);

    await User.update({ password: passwordHash }, { where: { email: email } });

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// router.put('/resetPassword', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email, password)
//     const passwordHash = await bcrypt.hash(password, 10)

//     await User.update({ password: passwordHash }, { where: { email: email } })

//     const mailOptions = {
//         from: "phonezonestoreapp@gmail.com",
//         to: email,
//         subject: 'Password changed successfully',
//         html: '<p>Your password has been changed successfully.</p>',
//        };
//        transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           res.status(500).json({ msg: 'Error sending email.' });
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.json({ msg: 'Password successfully changed and email sent!' });
//         }
//       });

//     res.json({ msg: "Password successfully changed!" })
//   } catch (err) {
//     return res.status(500).json({ msg: err.message })
//   }

// });

// banned de user

router.put("/banned/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (user.enabled === true) {
      await User.update({ enabled: false }, { where: { id: id } });
      res.send("User has been banned");
    } else {
      await User.update({ enabled: true }, { where: { id: id } });
      res.send("User has been unbanned");
    }
  } catch (err) {
    console.log(err);
  }
});

// cambio a administrador

router.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({
      where: { id: id },
    });

    if (users.rol === "user") {
      await User.update({ rol: "admin" }, { where: { id: id } });
      res.send("updated user to admin");
    } else {
      await User.update({ rol: "user" }, { where: { id: id } });
      res.send("you have become a user");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const selectedUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (selectedUser) {
    res.status(200).send(selectedUser);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (selectedUser) {
      let data = { ...req.body };

      let keys = Object.keys(data);

      keys.forEach((k) => {
        selectedUser[k] = data[k];
      });

      await selectedUser.save();

      res.status(200).send(selectedUser);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (deletedUser) {
      await User.destroy({ where: { id: id } });
      return res.status(200).json("User deleted");
    } else {
      res.status(404).json({ msj: "user not found" });
    }
  } catch (err) {
    return res.status(500).send(`User could not be deleted (${err})`);
  }
});

module.exports = router;
