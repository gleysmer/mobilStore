import Card from './Card'
import Slider from 'react-slick'

export default function Slider2({data, tittle}){

    const settings = {
        arrows: false,
        Infinite: false,
        speeed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpped: 5000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }


  return (

      <div className='max-w-full mx-4'>

        <div>
            <h1 className="text-2xl mb-4 mt-10  font-bold leading-none text-left text-slate-900 dark:text-slate-100">{tittle}</h1>
            <hr className='border-gray-400' />
            
      
            <Slider {...settings}>
                {data.map((e,index) => <Card 
                                            key={index}
                                            id={e.id}
                                            image={e.image}
                                            name={e.name}
                                            price={e.price}
                                            brand={e.brand}
                                            stock={e.stock}
                                            calification={e.calification}
                                        />)}
            </Slider>
         </div>
    </div>
  )
}