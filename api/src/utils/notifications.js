const nodemailer = require("nodemailer");

const {
    User,
    Orders,
    Product,
    OrderStatus,
    ProductOrder,
  } = require("../db.js");

const informationSearch = async (
    idUser,
    cadenaCantidades,
    cadenaPrecios,
    cadenaTitulos) => {

        // [10, 20]
        // [2, 1]

        if(idUser && cadenaCantidades && cadenaPrecios && cadenaTitulos){
            let total = 0;
            for(let i = 0; i < cadenaCantidades.length; i++) {
                total += cadenaCantidades[i] * cadenaPrecios[i]
            }
        
            let cantidades = cadenaCantidades.map((str) => Number(str)); 
            let products = cadenaTitulos.filter((item, index) => {
                return cadenaTitulos.indexOf(item) === index;
            });

            
            const comprador = await User.findOne({
                where: {
                    id: idUser,
                },
            });
            
            const order = await Orders.findAll({
                where: {
                    userId: comprador.id,
                },
                order: [['date', 'DESC']],
                limit: 1,
            });
            
            // sendConfirmedPaymentEmail(cantidades, products, comprador, order)
            return {
                cantidades, products, comprador, order, total
            }
        }else {
            const comprador = await User.findOne({
                where: {
                    id: idUser,
                },
            });
            const order = await Orders.findAll({
                where: {
                    userId: comprador.id,
                },
                order: [['date', 'DESC']],
                limit: 1,
            });
            return {
                comprador, order
            }
        }
}
const sendConfirmedPaymentEmail = async (
    idUser,
    cadenaCantidades,
    cadenaPrecios,
    cadenaTitulos
) => {
    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_PHONEZONE,
                pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
            },
        });
        
        
        let datos = await informationSearch(
            idUser,
            cadenaCantidades,
            cadenaPrecios,
            cadenaTitulos)

            console.log("datos", datos);

        let cantidadesTotales = datos.cantidades.map((str) => Number(str)); 
        let cantidades = 0;
        for(let i = 0; i < cantidadesTotales.length; i++) {
            cantidades += cantidadesTotales[i]
        }
        

        // console.log("cantidadesTotales es ", cantidadesTotales)
        // console.log("DATOS.order ES: ", datos.order)
        // console.log("DATOS.order.orders ES: ", datos.order.orders)
        // console.log("DATOS.order.address ES: ", datos.order[0].address)
        setTimeout( async () => {
          await transporter.sendMail({
              from: process.env.USER_EMAIL_GAMERS_STORE,
              to: `${datos.comprador.email}`,
              subject: "Información de orden de compra de MercadoPago",
              html: `
              <body style=" font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;" >
              <div style="background-color: #89CFF0; padding-top:20px; width:auto; ">
                  <div style="justify-content: center; display: flex;">
                    <center> <img src="cid:fondo-email" style="width:60%;border-radius: 2%; "/></center>
                  </div>
                  <div style="font-size: 20px; text-align:center; color: grey;">
                    <p style="line-height: 140%;">${datos.comprador.name} ${datos.comprador.surname}  Gracias por comprar en <span style="color: #23a7be; line-height: 22.4px;"><a rel="noopener" href="http://127.0.0.1:5173/" target="_blank" style="color: #00008B;text-decoration: none;">PhoneZone 📱</a></span></p>
                  </div>
                  <div style="line-height: 140%; font-size: 17px; text-align:center">
                    <p style="line-height: 140%;"><span style="background-color: #89CFF0; line-height: 19.6px; letter-spacing: 2px;"><strong><span style="color: #00008B; line-height: 19.6px;">Resumen de tu compra:</span></strong></span></p>
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;">
                    <p style="line-height: 140%;">Compraste ${cantidades} unidades!</p>
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;">
          
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;">
                  <p style="line-height: 140%;"> Productos:${datos.products}</p>
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;">
                
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;"">
                    <p style="line-height: 140%;">Total de la compra: $${datos.total}</p>
                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey;"">

                  </div>
                  <div style="line-height: 140%;font-size: 17px; text-align:center; color: grey; background-color: #00CCFF; padding: 20px;">
                    <p style="line-height: 140%;">Si tienes algún problema, estamos para ayudarte <a rel="noopener" href="http://127.0.0.1:5173/" target="_blank" style="color: #00008B;text-decoration: none;">Contactanos :)</a></p>
                  </div>
              </div>
              </body>
              `,
              attachments:[
                {
                  filename:'fondo-email.jpg',
                  path:'public/fondo-email.jpg',
                  cid:'fondo-email'
                }
              ]
            })
          }, 15000)
          let lineaComentada = '<p style="line-height: 140%;">Envio a domicilio: ${datos.order[0].address}</p>'
    }catch(error){
       console.log(error) 
    }
}

const sendEmailOrderSent = async (
    idUser
    ) => {
    try {


        // console.log("idUser en sendEmailOrderSent es: ", idUser)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_PHONEZONE,
                pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
            },
        });

        let datos = await informationSearch(
            idUser);

        // console.log("datos es: ", datos)
        
        await transporter.sendMail({
            from: process.env.EMAIL_PHONEZONE,
            to: `${datos.comprador.email}`,
            subject: "Información de envio de producto",
            html: `
          <body style="background-color: #60ecc9; padding:10px " >
            <div style="font-size: 20px; text-align:center">
              <p style="line-height: 140%;">${datos.comprador.name} ${datos.comprador.surname}  Gracias por comprar en <span style="color: #843fa1; line-height: 22.4px;"><a rel="noopener" href="http://127.0.0.1:5173/" target="_blank" style="color: #843fa1;text-decoration: none;">Phone Zone 📱</a></span></p>
            </div>
            <div style="line-height: 140%; font-size: 17px; text-align:center">
              <p style="line-height: 140%;"><span style="background-color: #bfedd2; line-height: 19.6px;"><strong><span style="color: #843fa1; line-height: 19.6px;">Tu compra en nuestro sitio ha sido enviada en el dia de la fecha</span></strong></span></p>
            </div>
            <div style="line-height: 140%;font-size: 17px; text-align:center">
              <p style="line-height: 140%;">Envio a domicilio: ${datos.order[0].address}</p>
            </div>
            <hr></hr>
            <div style="line-height: 140%;font-size: 17px; text-align:center">
              <p style="line-height: 140%;">Si tenés algún problema, estamos para ayudarte.<a rel="noopener" href="http://127.0.0.1:5173/" target="_blank" style="color: #843fa1;text-decoration: none;">Contactanos :)</a>.</p>
            </div>
            `,
          });
    }catch (error){
        console.log(error)
    }

}

module.exports = {sendConfirmedPaymentEmail, sendEmailOrderSent};