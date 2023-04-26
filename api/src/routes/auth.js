const { Router } = require("express");
const { User } = require("../db");
const passport = require("passport");
const CLIENT = process.env.CLIENT;
require("../utils/passport");
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const router = Router();

router.get("/login/success", async (req, res) => {

  try {

    if (req.user){

      console.log("DATTITOS", req.user);
      const EMAIL = req.user.emails[0].value;

      let user = await User.findOne({
        where: { email: EMAIL },
      });

      console.log("USER", user);

      if(user){

        const EMAIL = req.user.emails[0].value;

        const user = await new Promise((resolve, reject) => {
          User.findOne({
          where: { email: EMAIL }
          }).then(user => resolve(user))
        .catch(error => reject(error));
        });

        const data_user = {
          id: user.dataValues.id,
          name: req.user.given_name,
          surname: req.user.family_name,
          image: user.dataValues.image,
          email: EMAIL,
          //rol: user.dataValues.rol,
        }

        console.log("DATA-USER", data_user);

        return res.status(200).json(data_user)
      }else{
        
        let lastUserId = await User.findOne({
          order: [["createdAt", "DESC"]], // Ordena por la fecha de creación de manera descendente para obtener el último usuario creado
        });
        
        let lastId;
        if(lastUserId){ lastId = lastUserId.id + 1; }
        else{  lastId = 1 }

        if (!user) {
          user = await User.create({
          id:lastId,
          email: EMAIL,
          name: req.user.given_name,
          surname: req.user.family_name,
          image:
            req.user.photos && req.user.photos.length > 0
              ? req.user.photos[0].value
              : null,
          rol: "user",
      }   );
        }

      const data_user = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        image: user.image,
        email: user.email,
        rol: user.rol,
      };

    return res.status(200).json(data_user);
  } 
  }
}catch(error){
  return res.status(400).json({error: error.message})
}
});

// router.get('/login/success', async (req, res) => {

//   console.log("REQ", req.user)

//   if(req.user){

//     const EMAIL = req.user.emails[0].value;

//     const user = await new Promise((resolve, reject) => {
//       User.findOne({
//         where: { email: EMAIL }
//       })
//       .then(user => resolve(user))
//       .catch(error => reject(error));
//     });

//     const data_user = {
//         id: user.dataValues.id,
//         name: req.user.given_name,
//         surname: req.user.family_name,
//         image: user.dataValues.image,
//         email: EMAIL,
//         //rol: user.dataValues.rol,
//     }

//     return res.status(200).json(data_user);
//   } else{
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// });


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "ERROR, PA",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"] ));
  
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: 'http://localhost:5173',
    failureRedirect: "/login/failed",
  })
  );
  

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT);
});

module.exports = router;