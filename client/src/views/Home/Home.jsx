import { useState } from "react"
import Header from "../../components/Header/Header"
import Carrucel from "../../components/Carrucel/Carrucel"
import Footer from '../../components/Footer/Footer'
import Slider from '../../components/Carrucel/Slider'
import icons from '../../assets/icons-header/icons'

export default function Home(){

  const data = [  

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
  
  ];

  const data2 = [

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

  ];

  const [permissions, setPermissions] = useState(window.localStorage.getItem("permissions"));

  const renderPermissionConsent = () => (
   
    <div class="relative flex justify-center items-center z-10">
    <button onclick="showMenu(true)" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none absolute z-0 top-48 py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black">Open</button>

    <div id="menu" className="w-full h-full bg-gray-900 bg-opacity-90 top-0 fixed sticky-0">
        <div class="2xl:container 2xl:mx-auto py-32 px-4 md:px-28 flex justify-center items-center">
            <div class="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-5 xl:py-20 xl:px-20">
                <div role="banner">
                    <img class="w-20 md:w-24 lg:w-48" src={icons.logo} alt="icon" ></img>
                </div>
                <div class="mt-8">
                    <h1 role="main" class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Before continuing on our website</h1>
                </div>

                <div class="mt">
                    <p class="mt-6 sm:w-2/3 text-bold dark:text-white text-center leading-7 mx-auto text-gray-900">
                      This website uses cookies to ensure you get the best experience on your website
                    </p>
                </div>

                <button onClick={(e) => handleCookies(e)}class="w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center
                 text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black">Accept Cookies
                </button>

                <a href="javascript:void(0)" class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">Nope.. I am on a diet</a>
                <button onclick="showMenu(true)" class="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                    <img class="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cookies-1-svg2.svg" alt="close" ></img>
                    <img class="dark:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cookies-1-svg2dark.svg" alt="close" ></img>
                </button>
            </div>
        </div>
    </div>
  </div>
  )

  const handleCookies = (e) => {

    e.preventDefault();

    window.localStorage.setItem("permissions", true);
    setPermissions(true);        
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800">

      {(permissions === null) && renderPermissionConsent()}

      <Header />
      <Carrucel />

      <div class="bg-cover bg-no-repeat mb-5">
        <Slider data={data} tittle={"Recommended for you 🏆"} />
        <Slider data={data2} tittle={"Best sellers 🏆"} />
      </div>

      <Footer />

    </div>
  )
}
