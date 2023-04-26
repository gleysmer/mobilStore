//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn ,Brand, Color, StorageCapacity } = require('./src/db.js');


const initiateTables = async () => {
 
  let marcas = [
    {name:'Samsung', logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'}, 
    {name:'Sony', logo:'https://guiaimpresion.com/wp-content/uploads/2020/06/1957-1961.jpg'},
    {name:'Lg', logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'},
    {name: 'Huawei', logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'},
    {name: 'Xiaomi', logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'},
    {name: 'Motorola', logo:"https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"},
    {name: 'Apple', logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"}
  ];
  
  for(let index in marcas){
    // console.log(platforms[index].name);
    await Brand.findOrCreate(
        {
            where: {
                name: marcas[index].name,
                logo: marcas[index].logo
            }
        }
    )
  }

  let colors = [
    {id: 1, color: "Blue"},
    {id: 2, color: "Red"},
    {id: 3, color: "White"},
    {id: 4, color: "Coral"},
    {id: 5, color: "Black"},
    {id: 6, color: "Green"},
    {id: 7, color: "Grey"},
    {id: 8, color: "Blue"},
    {id: 9, color: "Pink"},
    {id: 10, color: "Pink"}
  ];

  colors.forEach(async (element) => {
    await Color.findOrCreate({
      where: {
        id:  element.id,
        color: element.color
      }
    })
  })

  let capacidades = [
    {id: 1, capacity: 8},
    {id: 2, capacity: 16},
    {id: 3, capacity: 32},
    {id: 4, capacity: 64},
    {id: 5, capacity: 128},
    {id: 6, capacity: 256},
    {id: 7, capacity: 512},
    {id: 8, capacity: 1024},
    {id: 9, capacity: 2048}
  ];

  capacidades.forEach(async (element) => {
    await StorageCapacity.findOrCreate({
      where: {
        id:  element.id,
        capacity: element.capacity
      }
    })
  })
}

// Syncing all the models at once.

const PORT = process.env.PORT || 3001
conn.sync({ force: false }).then(() => {

  initiateTables()

  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
