import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCapacity, getDetail, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./details.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import atras from "../../assets/atras.png"
import { Reviews } from "../Reviews/Reviews";
import { CreateReviews } from "../Reviews/CreateReviews";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { postReviews } from '../../redux/actions';
import swal from "sweetalert2";

import '../Reviews/reviews.css'

function Details(){

  const [details] = useSelector((state) => state.details);
  console.log(details);

  const User= useSelector(state=>state.User)
  const msg= useSelector(state=>state.message)
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { productId } = useParams();

  const product= useSelector(state=>state.Phones).filter(p=>p.id==productId)
  
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);


  return(

    <div className="bg-gray-100 dark:bg-gray-800">

      <Header />

    <section class="text-gray-700 body-font overflow-hidden bg-gray-100 dark:bg-gray-800">

    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-400" src={details?.image} />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">{details?.brand.name}</h2>
          <h1 class="text-gray-900 dark:text-slate-100 text-3xl title-font font-medium mb-1 mt-3 uppercase">{details?.name}</h1>
          <div class="flex mb-4 mt-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-60 dark:text-gray-300 ml-3">12 Reviews</span>
          </span>
          
        </div>
        <p class="leading-relaxed dark:text-slate-100 mt-4">{details?.description}</p>

        {
          Object.keys(User).length === 0 ? <></> :
          
          <Link to={`/review/${details?.id}`}>
            <p className="mt-4 text-red-500 text-xl ">Make a review</p>
          </Link>
        }
      
        <div class="flex">
          <span class="title-font font-medium text-4xl mt-48 text-gray-900 dark:text-slate-100">${details?.price}.00</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="flex flex-col gap-y-4 mb-8">
        <Reviews />
      </div>
      

      <Footer />

    </div>
    
  );
}

export default Details;
