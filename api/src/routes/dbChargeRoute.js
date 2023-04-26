const { Router } = require("express");
const { v4: uuidv4 } = require('uuid');
const { Brand, Product, Color, StorageCapacity, User, Orders, OrderStatus, Detail } = require("../db.js");
const faker = require('faker');
const axios = require('axios');
const router = Router();

router.post('/products', async (req, res) => {
  try {
    let telefonos = [

      {
        id: 1,
        name: "Moto G52",
        description: "It has 6 GB of RAM, 128 GB of internal storage and an ultra-fast Octa Core processor, great performance for gaming and streaming videos..",
        price: 70,
        image: "https://res.cloudinary.com/dmxriftxk/image/upload/v1681576704/pasadas%20a%20png/moto-g52_kgmcbm.png",
        stock: 25,
        year: 2022,
        enabled: true,
        brandId: 6,
        brand: {
          id: 6,
          name: "Motorola",
          logo: "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
        },
        colorId: 1,
        storageCapacityId: 3
      },

      {
        id: 2 ,
        name: "moto G Pure",
        description: "DUAL CAMERA SYSTEM: Get professional-looking portraits with a blur effect using the depth sensor. The 13MP camera with phase detection autofocus (PDAF) captures your subject in the blink of an eye..Form_factor : SlateMORE FUN. LESS LAG: Feel your phone respond instantly to every touch, tap, and swipe using an octa-core processor with HyperEngine.",
        price: 46,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576704/pasadas%20a%20png/moto_g_pure_vrd94l.png",
        stock: 100,
        year: 2022,
        enabled: true,
        brandId: 6,
        brand: {
          id: 6,
          name: "Motorola",
          logo: "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
          
        },
        colorId: 5,
        storageCapacityId: 3
      },

      {
        id: 3,
        name: "Moto G Stylus 5G",
        description: "Carrier compatibility: AT&T: 4G, VoLTE 5G support planned via MR, Verizon: 5G sub6 NSA, VoLTE, T Mobile: 5G sub6 SA/NSA, VoLTE, WiFi Calling, Video Calling, Tracfone: GSM, CDMA, Spectrum: 5G sub6 NSA, VoLTE, WiFi Calling. Does not support: U.S.",
        price: 100,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576701/pasadas%20a%20png/Moto_G_Stylus_5G_beu8ys.png",
        stock: 7,
        year: 2021,
        enabled: true,
        brandId: 6,
        brand: {
          id: 6,
          name: "Motorola",
          logo: "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
        },
        colorId: 5,
        storageCapacityId: 5
      },

      {
        id: 4,
        name: "Razr",
        description: "5G - Universal Unlocked - Compatible with all major U.S. carriers, including Verizon, AT&T, Sprint and T-Mobile. Also compatible with prepaid carriers including Cricket Wireless, Metro by T-Mobile, Google Fi, Simple Mobile, Total Wireless, Tracfone, Net10, Mint, and H2O.",
        price: 300 ,
        image:"https://d500.epimg.net/cincodias/imagenes/2022/08/11/smartphones/1660211132_119851_1660211255_sumario_normal.jpg",
        stock: 10,
        year: 2023,
        enabled: true,
        brandId: 6,
        brand: {
          id: 6,
          name: "Motorola",
          "logo": "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
          
        },
        colorId: 5,
        storageCapacityId: 6

      },

      {
        id: 5,
        name: "iPhone SE 2020",
        description: "",
        price: 200,
        image: "https://res.cloudinary.com/dmxriftxk/image/upload/v1681576701/pasadas%20a%20png/iPhone_SE_2020_wbbg2o.png",
        stock: 25,
        year: 2020,
        enabled: true,
        brandId: 7,
        brand: {
          id: 7,
          name: "Apple",
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CA",
        },
        colorId: 3,
        storageCapacityId: 3
      },

      {
        id: 6,
        name: "Galaxy S23 Ultra",
        description: "CAPTURE THE NIGHT IN LOW LIGHT: Whether you’re headed to a concert or romantic night out, there’s no such thing as bad lighting with Night Mode; Galaxy S23 Ultra lets you capture epic content in any setting with stunning Nightography",
        price:300,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576691/pasadas%20a%20png/Galaxy_S23_Ultra_jrolxj.png",
        stock: 12,
        year: 2023,
        enabled: true,
        brandId: 1,
        brand: {
          name:'Samsung', 
          logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
        },
        colorId: 3,
        storageCapacityId: 6

      },
      {
        id:7 ,
        name: "Galaxy Z Flip4",
        description: "FLEX, POSE, POST: Getting that post-worthy solo shot is easy with a phone that stands on its own; Put Galaxy Z Flip4 in Flex Mode and capture hands-free selfies, record your epic dance moves and never worry about your makeshift tripod falling over again.Form_factor : Flip",
        price: 350,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576693/pasadas%20a%20png/Galaxy_Z_Flip4_itlrbb.png",
        stock: 8,
        year: 2023,
        enabled: true,
        brandId: 1,
        brand: {
          name:'Samsung', 
          logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
        },
        colorId: 10,
        storageCapacityId: 6

      },

      {
        id: 8,
        name: "Galaxy A23",
        description: "Carrier: This phone is locked to Total by Verizon, which means this device can only be used on the Total by Verizon wireless network.",
        price: 120,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576694/pasadas%20a%20png/Galaxy_A23_ahubyw.png",
        stock: 3,
        year: 2020,
        enabled: true,
        brandId: 1,
        brand: {
          id: 1,
          name:'Samsung', 
          logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
        },
        colorId: 5,
        storageCapacityId: 3

      },

      {
        id: 9,
        name: "POCO M3",
        description: "LONG LASTING BATTERY: Stay ready for today’s surprises with the fast charging,* long-lasting battery of Galaxy A14 5G; Confidently handle work while on the go and play your favorite games with a battery that gives your charger a break",
        price: 150,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576705/pasadas%20a%20png/POCO-M3_dtlbvo.png",
        stock: 30,
        year: 2020,
        enabled: true,
        brandId: 5,
        brand: {
          id: 5,
          name:'Xiaomi', 
          logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
        },
        colorId: 5,
        storageCapacityId: 4
      },

      {
        id: 10,
        name: "S10+",
        description: "Updated Camera Features: Get the more powerful S10 with a software update that gives you all new features including Single Take AI, Pro Video and more.Form_factor : Smartphone",
        price: 150,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576708/pasadas%20a%20png/S10_bhbqh0.png",
        stock: 25,
        year: 2019,
        enabled: true,
        brandId: 1,
        brand: {
          name:'Samsung', 
          logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
        },
        colorId: 5,
        storageCapacityId: 8
      },

      {
        id: 11,
        name: "iPhone 13 Pro",
        description: "Unlocked Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.",
        price: 300,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576692/pasadas%20a%20png/iPhone_13_Pro_fup7ze.png",
        stock: 4,
        year: 2023,
        enabled: true,
        brandId: 7,
        brand: {
          id:7 ,
          name: 'Apple',
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
        },
        colorId: 7,
        storageCapacityId: 7
      },

      {
        id: 12,
        name: "iPhone 13 Pro Max",
        description: "Unlocked Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.",
        price: 321,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576693/pasadas%20a%20png/iPhone_13_Pro_Max_flfno8.png",
        stock: 9,
        year: 2021,
        enabled: true,
        brandId: 7,
        brand: {
          id:7 ,
          name: 'Apple',
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
        },
        colorId: 8,
        storageCapacityId: 6

      },
      {
        id: 13,
        name: "iPhone 11 Pro",
        description: "This phone is unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.).",
        price: 200,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576693/pasadas%20a%20png/iPhone_11_Pro_vfktq3.png",
        stock: 8,
        year: 2020,
        enabled: true,
        brandId: 7,
        brand: {
          id:7 ,
          name: 'Apple',
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
        },
        colorId: 5,
        storageCapacityId: 4
      },

      {
        id: 14,
        name: "iPhone XS",
        description: "This phone is unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.).",
        price :89,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576700/pasadas%20a%20png/iPhone_XS_dqeuvc.png",
        stock: 9,
        year: 2019,
        enabled: true,
        brandId: 7,
        brand:{
          id:7 ,
          name: 'Apple',
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
        },
        colorId: 5,
        storageCapacityId: 6
      },

      {
        id: 15,
        name: "iPhone 12",
        description: "Unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.)",
        price: 78,
        image: "https://res.cloudinary.com/dmxriftxk/image/upload/v1681576692/pasadas%20a%20png/iPhone_12_taimyq.png",
        stock: 6,
        year: 2019,
        enabled: true,
        brandId: 7,
        brand: {
          id:7 ,
          name: 'Apple',
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
        },
        colorId: 2,
        storageCapacityId: 4
      },

      {
        id:16 ,
        name: "P30",
        description: "This is an unlocked international mobile phone and it may be used with any GSM network in the world that uses a frequency or band that this device supports. This phone/tablet will NOT work with Verizon, Sprint, Boost, or any other CDMA network. Wireless frequencies for 3G, 4G, and LTE vary by network",
        price:153 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576706/pasadas%20a%20png/P30_j4theb.png",
        stock: 15,
        year: 20,
        enabled: true,
        brandId: 4,
        brand: {
          id:4 ,
          name: 'Huawei', 
          logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'
        },
        colorId: 5,
        storageCapacityId: 3
      },


      {
        id: 17,
        name: "Mate 20 Pro",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.",
        price:130 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576703/pasadas%20a%20png/Mate-20-Pro_todt3i.png",
        stock: 6,
        year: 2020,
        enabled: true,
        brandId: 4,
        brand: {
          id:4 ,
          name: 'Huawei', 
          logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'
        },
        colorId: 7,
        storageCapacityId: 5

      },
      {
        id:18 ,
        name: "P9 Lite",
        description: "5.2-inch with IPS LCD capacitive touchscreen, 16M colors, HiSilicon Kirin 650, Quad-core 2.0 GHz Cortex-A53 And quad-core 1.7 GHz Cortex-A53. 16 GB ROM, 2 GB RAM. Main Camera: 13 MP, f/2.0, autofocus, LED flash; Front Camera: 8 MP, f/2.0, LED flash.",
        price:50 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576706/pasadas%20a%20png/P9_Lite_ixotmy.png",
        stock: 20,
        year: 2019,
        enabled: true,
        brandId: 4,
        brand: {
          id:4 ,
          name: 'Huawei', 
          logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'
        },
        colorId: 5,
        storageCapacityId: 3

      },

      {
        id: 19,
        name: "P20",
        description: "For USA Buyers : This Smartphone is compatible/will work with any GSM Networks such as AT&T, T-Mobile. For exact 2G GSM, 3G, 4G/LTE compatibility, please check with your network provider in advance prior to your purchase. This phone WILL NOT WORK with any CDMA Networks such as VERIZON, SPRINT, US CELLULAR.",
        price:63 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576705/pasadas%20a%20png/P20_njxe95.png",
        stock: 25,
        year: 2019,
        enabled: true,
        brandId: 4,
        brand: {
          id:4 ,
          name: 'Huawei', 
          logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'
        },
        colorId: 5,
        storageCapacityId: 5

      },
      {
        id: 20,
        name: "8A",
        description: "6.09 screen experience A minimalist dewdrop design: dew notch, face recognition, screen unlock Exquisite dual-textured body 8-Core Power efficient processor Volume taken to the next level A sound cannon in your pocket Wireless FM radio, a world of content delivered anytime, anywhere 13MP wide-aperture camera Crystal Clear Night Photography Dual SIM Slot and Micro-SD slot",
        price: 20,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576691/pasadas%20a%20png/8A_aupq4n.png",
        stock: 3,
        year: 2019,
        enabled: true,
        brandId: 4,
        brand: {
          id:4 ,
          name: 'Huawei', 
          logo:'https://www.notodofilmfest.com/wp-content/uploads/2019/02/huawei-logo-720x388.png'
        },
        colorId: 5,
        storageCapacityId: 2

      },
      {
        id: 21,
        name: "V40 ThinQ",
        description: "5 Camera Phone: Triple Rear Cameras & Dual Front Cameras 6.4 inch QHD+ OLED Display (3120 x 1440, including notch); 538 ppi IP68 Dust and Water Resistant & Shock Resistant - MIL-STD-810G Tested",
        price: 30,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576706/pasadas%20a%20png/V40_ThinQ_gycn25.png",
        stock: 8,
        year: 2020,
        enabled: true,
        brandId: 3,
        brand: {
          id:3,
          name:'Lg',
          logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 4

      },{
        id: 22,
        name: "LG Stylo 6",
        description: "6.8 FHD+ FullVision DisplayBuilt-In Stylus PenTriple Camera System4,000 mAh Battery03 GB RAM / 64 GB ROM / expandable microSD",
        price:30 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576695/pasadas%20a%20png/LG_Stylo_6_vqvdve.png",
        stock: 3,
        year: 2021,
        enabled: true,
        brandId: 3,
        brand: {
          id:3,
          name:'Lg',
          logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 4

      },

      {
        id: 23,
        name: "LG G6 H872",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.",
        price: 41,
        image:"https://m.media-amazon.com/images/I/51TVS0k+DdL.AC_SX679.jpg",
        stock: 25,
        year: 2020,
        enabled: true,
        brandId: 3,
        brand: {
          id:3,
          name:'Lg',
          logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'
          
        },
        colorId: 7,
        storageCapacityId: 4

      },
      {
        id: 24,
        name: "LG V20 VS995",
        description: "Main Camera: Dual 16 MP (29mm, f/1.8) + 8 MP (12mm, f/2.4), laser autofocus, OIS, LED flash; Front Camera: 5 MP .64GB ROM, 4GB RAM; Supports Micro-SD up to 2TB, Qualcomm MSM8996 Snapdragon 820, Quad-core CPU, 5.7 inches, IPS LCD capacitive touchscreen, 16M colors.",
        price:63 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576702/pasadas%20a%20png/LG_V20_VS995_ilaoat.png",
        stock: 4,
        year: 2022,
        enabled: true,
        brandId: 3,
        brand: {
          id:3,
          name:'Lg',
          logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 3

      },
      {
        id:25 ,
        name: "LG Phoenix 2",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination.",
        price: 100 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576695/pasadas%20a%20png/LG_Phoenix_2_eyfya3.png",
        stock: 4,
        year: 2019,
        enabled: true,
        brandId: 3,
        brand: {
          id:3,
          name:'Lg',
          logo:'https://static.vecteezy.com/system/resources/previews/018/911/615/original/lg-logo-life-s-good-editorial-free-vector.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 2
      },

      {
        id: 26,
        name: "Sony Xperia 1",
        description: "4K HDR native 120fps video recording[1] on all rear lenses[2].Form_factor : Bar.Display resolution maximum:1644 x 3840 pixels",
        price: 200,
        image: "https://res.cloudinary.com/dmxriftxk/image/upload/v1681576705/pasadas%20a%20png/Sony_Xperia_1_fwbvlm.png",
        stock: 8,
        year: 2022,
        enabled: true,
        brandId: 2,
        brand: {
          id: 2,
          name:'Sony', 
          logo:'https://guiaimpresion.com/wp-content/uploads/2020/06/1957-1961.jpg'
        },
    
        colorId: 5,
        storageCapacityId: 6

      },
      {
        id: 27 ,
        name: "Sony Xperia 5 III",
        description: "Variable tele lens and Dual PD sensor with Real-time Eye AF 360 Reality Audio through its speakers, 360 Spatial Sound up-mixing",
        price: 96,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576706/pasadas%20a%20png/Sony-Xperia-5-III_hf3wc4.png",
        stock: 4,
        year: 2019,
        enabled: true,
        brandId: 2,
        brand: {
          id:2,
          name:'Sony', 
          logo:'https://guiaimpresion.com/wp-content/uploads/2020/06/1957-1961.jpg'
        },
        colorId: 5,
        storageCapacityId: 2

      },
      {
        id: 28,
        name: "Sony Xperia PRO",
        description: "NOTE: Global Version. No Warranty. This device is globally unlocked and ready to be used with your preferred GSM Carrier. THIS DEVICE IS NOT COMPATIBLE with CDMA carriers such as Cricket, Verizon, Sprint, Boost Mobile, US Cellular, etc. SIM CARD NOT INCLUDED. Please confirm device compatibility with your service provider before placing your order",
        price: 36,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576707/pasadas%20a%20png/Sony-Xperia-PRO_mbv1bt.png",
        stock: 4,
        year: 2022,
        enabled: true,
        brandId: 2,
        brand: {
          id:2,
          name:'Sony', 
          logo:'https://guiaimpresion.com/wp-content/uploads/2020/06/1957-1961.jpg'
        },
        colorId: 5,
        storageCapacityId: 7

      },

      {
        id:30,
        name: "Sony Xperia L1",
        description: "5.5” borderless HD display with a curved back panel for a comfortable fit in your hands",
        price: 12,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576706/pasadas%20a%20png/Sony-Xperia-L1_ewyn8j.png",
        stock: 23,
        year: 2020,
        enabled: true,
        brandId: 2,
        brand: {
          id:2,
          name:'Sony', 
          logo:'https://guiaimpresion.com/wp-content/uploads/2020/06/1957-1961.jpg'
        },
        colorId: 9,
        storageCapacityId: 4

      },
      {
        id: 31,
        name: "Xiaomi Redmi Note 8",
        description: "Ultra high resolution photos allow for 3.26m poster prints. - Capture all the details with the macro lens.",
        price:300 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576711/pasadas%20a%20png/Xiaomi_Redmi_Note_8_zfjivn.png",
        stock: 50,
        year: 2022,
        enabled: true,
        brandId: 5,
        brand: {
          id:5,
          name: 'Xiaomi',
          logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'
          
        },
        colorId: 1,
        storageCapacityId: 4

      },

      {
        id: 32,
        name: "Xiaomi Redmi Note 10 Pro",
        description: "NOTE: International Version. No Warranty. This device will work with GSM service providers like AT&T, T-Mobile, MetroPCS, and most other GSM service providers. It will not work with CDMA service providers like Verizon, US Cellular, Sprint, or any other CDMA service providers. Please check device compatibility with your cell phone provider before you place your order.",
        price: 35 ,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576709/pasadas%20a%20png/Xiaomi_Redmi_Note_10_Pro_aq0epw.png",
        stock: 32,
        year: 2021,
        enabled: true,
        brandId: 5,
        brand: {
          id:5,
          name: 'Xiaomi',
          logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'
          
        },
        colorId: 7,
        storageCapacityId: 5

      },
      {
        id: 33,
        name: "Xiaomi Mi 11 Lite",
        description: "Xiaomi Redmi 9A is a factory unlocked international model phone - No Warranty in US, only compatible with Most GSM Carriers such as T-Mobile, MetroPCS, Mint mobile, etc,but NOT",
        price: 100,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576710/pasadas%20a%20png/Xiaomi-Mi-11-Lite_wv77rt.png",
        stock: 56,
        year: 2021,
        enabled: true,
        brandId: 5,
        brand: {
          id:5,
          name: 'Xiaomi',
          logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'

        },
        colorId: 5,
        storageCapacityId: 5

      },
      {
        id: 34,
        name: "Poco C40 4G LTE",
        description: "Will NOT work on Verizon AT&T/BOOST/CRICKET/METRO PCS or any CDMA Carrier..4G LTE Worldwide Unlocked Dual Nano sim",
        price: 63,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576715/pasadas%20a%20png/Poco_C40_4G_LTE_wfookm.png",
        stock: 4,
        year: 2023,
        enabled: true,
        brandId: 5,
        brand: {
          id: 5,
          name: 'Xiaomi',
          logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 6

      },

      {
        id:35 ,
        name: "Nord N20",
        description: "5G Enabled - The OnePlus Nord N20 is the perfect entry-level 5G phone, featuring premium specs and an affordable price. *5G",
        price: 25,
        image:"https://res.cloudinary.com/dmxriftxk/image/upload/v1681576703/pasadas%20a%20png/Nord_N20_kvsaky.png",
        stock: 4,
        year: 2022,
        enabled: true,
        brandId: 5,
        brand: {
          id:5,
          name: 'Xiaomi',
          logo: 'https://s1.eestatic.com/2021/03/30/omicrono/hardware/569954632_176909725_1024x576.jpg'
          
        },
        colorId: 5,
        storageCapacityId: 3

      },
      
      ]
      // let telefonos = [
      //     {
      //       id: 1,
      //       name: "Moto G52",
      //       description: "It has 6 GB of RAM, 128 GB of internal storage and an ultra-fast Octa Core processor, great performance for gaming and streaming videos..",
      //       price: "70",
      //       image: "https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/g/5/g52-negro-frente_1.png",
      //       stock: 25,
      //       year: 2022,
      //       enabled: true,
      //       brandId: 6,
      //       brand: {
      //         id: 6,
      //         name: "Motorola",
      //         "logo": "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
      //       },
      //       colorId: 1,
      //       storageCapacityId: 3


      //     },
      //     {
      //       id: 2,
      //       name: "Galaxy S23 ULTRA Phantom black",
      //       description: "The Samsung Galaxy S23 offers 8 GB of RAM and 128 GB, 256 GB or 512 GB as internal storage options. The Samsung Galaxy S23+ offers 8 GB of RAM and 256 GB or 512 GB as internal storage options. The Samsung Galaxy S23 Ultra has 8 GB RAM or 12 GB RAM, 256 GB, 512 GB or 1 TB internal storage options.​",
      //       price: "75",
      //       image: "https://samsungar.vtexassets.com/arquivos/ids/186715-800-auto?width=800&height=auto&aspect=true",
      //       stock: 15,
      //       year: 2023,
      //       enabled: true,
      //       brandId: 1,
      //       brand: {
      //         id: 1,
      //         name: "Samsung",
      //         "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
      //       },
      //       colorId: 2,
      //       storageCapacityId: 4
      //     },
      //     {
      //       id: 3,
      //       name: "A52",
      //       description: "Galaxy A52 5G and Galaxy A72: Samsung's new upper-middle range has a Galaxy S21 design, up to 120 Hz and water resistance​",
      //       price: "69",
      //       image: "https://zelucashdev.s3.sa-east-1.amazonaws.com/uploads/telefono/modelo/Familia%20A/A52/A52_Blue_Back_800.png",
      //       stock: 10,
      //       year: 2021,
      //       enabled: true,
      //       brandId: 1,
      //       brand: {
      //         id: 1,
      //         name: "Samsung",
      //         "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
      //       },
      //       colorId: 3,
      //       storageCapacityId: 5
      //     },
      //     {
      //       id: 4,
      //       name: "moto g82",
      //       description: "The Moto G82 5G offers us a set of configurations that provides us with very good performance, autonomy that does not clash and a quality camera for good light conditions. For its price, this equipment is one of the best options in the Moto G line.​",
      //       price: "69",
      //       image: "https://armoto.vtexassets.com/arquivos/ids/162602-800-auto?v=638097391512370000&width=800&height=auto&aspect=true",
      //       stock: 14,
      //       year: 2022,
      //       enabled: true,
      //       brandId: 6,
      //       brand: {
      //         id: 6,
      //         name: "Motorola",
      //         "logo": "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
      //       },
      //       colorId: 6,
      //       storageCapacityId: 2
      //     },
      //     {
      //       id: 5,
      //       name: "IPHONE 13 PRO 512GB SILVER",
      //       description: "El iPhone 13 Pro Max es el terminal de mayor tamaño de la gama que cuenta con un procesador A15 Bionic y un equipo fotográfico formado por tres cámaras de 12 Mpx.​",
      //       price: "69",
      //       image: "https://www.megatone.net/images/Articulos/zoom2x/209/01/MKT0243ETC.jpg",
      //       stock: 11,
      //       year: 2021,
      //       enabled: true,
      //       brandId: 7,
      //       brand: {
      //         id: 7,
      //         name: "Apple",
      //         "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
      //       },
      //       colorId: 7,
      //       storageCapacityId: 7
      //     },
      //     {
      //       id: 6,
      //       name: "samsung s10",
      //       description: "anda",
      //       price: "30",
      //       image: "#",
      //       stock: 10,
      //       year: 2022,
      //       enabled: true,
      //       brandId: 1,
      //       brand: {
      //         id: 1,
      //         name: "Samsung",
      //         "logo": "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$"
      //       },
      //       colorId: 3,
      //       storageCapacityId: 6
      //     },
      //     {
      //       id: 7,
      //       name: "Iphone 12",
      //       description: "anda",
      //       price: "200",
      //       image: "#",
      //       stock: 10,
      //       year: 2022,
      //       enabled: true,
      //       brandId: 7,
      //       brand: {
      //         id: 7,
      //         name: "Apple",
      //         "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
      //       },
      //       colorId: 6,
      //       storageCapacityId: 8
      //     },
      //   ]
      let newProduct = "";
      let created;
      let brand = "";
      let colorete = "";
      let capacidad = "";

      for(let index in telefonos){
        [newProduct, created] = await Product.findOrCreate({
          where: {
            name: telefonos[index].name,
            description: telefonos[index].description,
            price: telefonos[index].price,
            image: telefonos[index].image,
            stock: telefonos[index].stock,
            year: telefonos[index].year,
            enabled: telefonos[index].enabled
          }
      });

      if (created) {
        // console.log("telefono brand", telefonos[index])
        brand = await Brand.findOne({
          where: {
            id: telefonos[index].brandId,
          },
        });
        // console.log(brand)
        // console.log("brand es: ", brand.id)
        await newProduct.setBrand(brand);

        colorete = await Color.findOne({
          where: {
            id: telefonos[index].colorId
          }
        })
        await newProduct.setColor(colorete)

        capacidad = await StorageCapacity.findOne({
          where: {
            id: telefonos[index].storageCapacityId
          }
        })
        await newProduct.setStorageCapacity(capacidad)

      }else {
        console.log('no creado')
      }

    }
      res.status(200).json(newProduct)
  }catch(error){
      res.status(500).json({error: error.message})
  }

})

router.post('/users', async (req, res)=> {
  let usuariosActuales = 
    [
  {
    id: 10,
    name: "Facundo",
    surname: "Maciel",
    password: "$2a$08$XZd2I1t5obwVaw4JiPAGWuwnJVGjXTZxvBBQi24GD6Uq0Mgq/RnR2",
    email: "maci.facundo@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: 518974,
    image: "",
    createdAt: "2023-04-17T17:48:20.257Z",
    updatedAt: "2023-04-17T18:09:22.825Z",
    cartId: null
  },
  {
    id: 6,
    name: "Kaypa",
    surname: "Kaypa",
    password: null,
    email: "kaypatorres@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: 279266,
    image: "https://lh3.googleusercontent.com/a/AGNmyxYjX5JCxs8GbjycIZ-pc2aCb3KgvSo1u6Lw_-Tc=s96-c",
    createdAt: "2023-04-17T02:48:50.057Z",
    updatedAt: "2023-04-17T18:13:27.265Z",
    cartId: null
  },
  {
    id: 1,
    name: "Victor",
    surname: "Pestana",
    password: "$2a$08$nPwcksK4vEnupXbthmxZL.zTZpWktDNmhxPEC..CnG2K.Yy/CPlaS",
    email: "victorpestana13@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: 897117,
    image: "https://res.cloudinary.com/dwfhsitwe/image/upload/v1681659960/posters/Screenshot_173_ssq04r.png",
    createdAt: "2023-04-16T15:46:02.976Z",
    updatedAt: "2023-04-17T00:46:46.045Z",
    cartId: 1
  },
  {
    id: 7,
    name: "Joose Ari",
    surname: "Joose Ari",
    password: null,
    email: "arijoose@gmail.com",
    rol: "admin",
    enabled: true,
    resetPasswordCode: null,
    image: "https://lh3.googleusercontent.com/a/AGNmyxb6r5ZGLdrbs0a3A7WhAI_1kpez8Hjt0oKWVQnsAg=s96-c",
    createdAt: "2023-04-17T03:00:17.292Z",
    updatedAt: "2023-04-17T03:20:29.471Z",
    cartId: null
  },
  {
    id: 4,
    name: "Ignacio",
    surname: "Coletta",
    password: "$2a$08$m8qvWgsKQb8.q5ZyUinrK.b4GnHC2yGeRxKWhWc8bjL4lHNYyQ4FC",
    email: "ignacio_coletta@hotmail.com",
    rol: "admin",
    enabled: true,
    resetPasswordCode: null,
    image: "https://ca.slack-edge.com/TPRS7H4PN-U03ERSRTV9D-76d86e420a13-512",
    createdAt: "2023-04-17T00:40:50.609Z",
    updatedAt: "2023-04-17T03:21:00.590Z",
    cartId: 4
  },
  {
    id: 8,
    name: "Victor",
    surname: "Pestana",
    password: "$2a$08$QNRUw2md5jAUCXgWmBEhF.IlIXTaKs.YEZwnK38HRgz1EKWiciRNK",
    email: "victorpestana137@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: null,
    image: "https://res.cloudinary.com/dwfhsitwe/image/upload/v1681701782/posters/TPRS7H4PN-U03SFCENDFF-88f7e4671807-512_evyk7y.jpg",
    createdAt: "2023-04-17T03:23:05.077Z",
    updatedAt: "2023-04-17T03:23:05.077Z",
    cartId: null
  },
  {
    id: 9,
    name: "El Arias",
    surname: "El Arias",
    password: null,
    email: "elarias12zz@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: null,
    image: "https://lh3.googleusercontent.com/a/AGNmyxb1cGLI8MLlK1MD5uNR1Pwp_yoNxNwRLqX2aknt=s96-c",
    createdAt: "2023-04-17T14:40:19.565Z",
    updatedAt: "2023-04-17T14:40:19.565Z",
    cartId: null
  },
  {
    id: 2,
    name: "gleismer",
    surname: "cedeñño",
    password: "$2a$08$vX60JzUkRiXT6pnHZj/sMef6Km4ofWGboIAcD0iaWWdMgWmI9dqnu",
    email: "gleismerco13@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: 349225,
    image: "https://res.cloudinary.com/dwfhsitwe/image/upload/v1681664462/posters/foto_xf5xcr.jpg",
    createdAt: "2023-04-16T17:01:07.187Z",
    updatedAt: "2023-04-17T15:18:06.226Z",
    cartId: null
  },
  {
    id: 3,
    name: "gleysmer",
    surname: "cedeño",
    password: "$2a$08$i4nRH17xWwEH6ScidaThc.ZW6y0O181K9YRW9tA9NeO91jDkevac2",
    email: "gleismerco@gmail.com",
    rol: "user",
    enabled: true,
    resetPasswordCode: 631235,
    image: "https://res.cloudinary.com/dwfhsitwe/image/upload/v1681664814/posters/foto_fva3cs.jpg",
    createdAt: "2023-04-16T17:06:53.726Z",
    updatedAt: "2023-04-17T15:18:12.599Z",
    cartId: 3
  },
  {
    id: 5,
    name: "Ignacio Coletta",
    surname: "Ignacio Coletta",
    password: null,
    email: "ignaciocoletta@gmail.com",
    rol: "user",
    enabled: false,
    resetPasswordCode: null,
    image: "https://lh3.googleusercontent.com/a/AGNmyxbY0xDdn6ZHE9LdS5v5lY8WmiUzpJ0azgl--cXX=s96-c",
    createdAt: "2023-04-17T02:46:45.041Z",
    updatedAt: "2023-04-17T15:18:18.012Z",
    cartId: null
  }
]
try{
  
  let lastUserId = await User.findOne({
    order: [["createdAt", "DESC"]], // Ordena por la fecha de creación de manera descendente para obtener el último usuario creado
  });
  let lastId;
  if(lastUserId){ 
   lastId = lastUserId.id + 1;
  }else{ 
    lastId = 1
  }
let i = lastId
for (i ; i < 150; i++) {
  let randomUser
  if( i % 2 === 0){
     randomUser = {
      id: i,
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      password: '$2a$08$m8qvWgsKQb8.q5ZyUinrK.b4GnHC2yGeRxKWhWc8bjL4lHNYyQ4FC',
      email: faker.internet.email(),
      rol: 'user',
      enabled: true,
      resetPasswordCode: null,
      image: null
    };
  }else {
     randomUser = {
      id: i,
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      password: '$2a$08$m8qvWgsKQb8.q5ZyUinrK.b4GnHC2yGeRxKWhWc8bjL4lHNYyQ4FC',
      email: faker.internet.email(),
      rol: 'admin',
      enabled: true,
      resetPasswordCode: null,
      image: null
    };
  }
  // Generamos una imagen aleatoria utilizando la API de Unsplash
  const response = await axios.get('https://source.unsplash.com/random');
  randomUser.image = response.request.res.responseUrl;

  await User.create(randomUser);

  
}
  res.status(200).send('usuarios creados')
}catch(error){
  res.status(400).json({error: error.message})
}
  
})

router.post('/orders', async (req,res) => {
  try {
    // Obtener IDs aleatorias de usuarios y productos
    const userIds = await User.findAll({ attributes: ['id'], raw: true });
    const productIds = await Product.findAll({ attributes: ['id'], raw: true });
    const randomUserIds = userIds.sort(() => Math.random() - 0.5).slice(0, 10).map(user => user.id);
    const randomProductIds = productIds.sort(() => Math.random() - 0.5).slice(0, 10).map(product => product.id);

    // Generar 10 órdenes aleatorias
    for (let i = 0; i < 100; i++) {
      const order = await Orders.create({
        id: uuidv4(),
        date: faker.date.past(),
        total: faker.commerce.price(),
        address: faker.address.streetAddress(),
        userId: randomUserIds[i % randomUserIds.length],
      });

      await OrderStatus.create({
        orderId: order.id,
        status: faker.random.arrayElement(['pending', 'sent']),
      });

      // Añadir productos aleatorios a la orden
      const randomProductQty = Math.floor(Math.random() * 5) + 1;
      const randomProducts = randomProductIds.sort(() => Math.random() - 0.5).slice(0, randomProductQty);
      const orderProducts = randomProducts.map(productId => ({
        orderId: order.id,
        productId,
        quantity: faker.datatype.number({ min: 1, max: 5 }),
        price: faker.commerce.price(),
      }));

      await Detail.bulkCreate(orderProducts);
    }

    res.status(200).send('ordenes creadas')
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})
//
module.exports= router;