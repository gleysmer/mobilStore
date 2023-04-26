import React ,{useState,useEffect} from 'react'
import "./reviews.css"
import { FaStar, FaRegStar } from 'react-icons/fa';
import { postReviews } from '../../redux/actions';
import { useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import swal from "sweetalert2";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export const CreateReviews = () => {
  const User= useSelector(state=>state.User)
  const msg= useSelector(state=>state.message)
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { productId } = useParams();
  const product= useSelector(state=>state.Phones).filter(p=>p.id==productId)

  const dispatch = useDispatch()
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
  const [error, setError] = useState({});
//  useEffect(() => {

//  }, [msg])
 
    const handleBlurComment = () => {
      if (!comment.trim()) {
        setError((prevErrors) => ({
          ...prevErrors,
          comment: 'Comment is required',
        }));
      } else {
        setError((prevErrors) => ({ ...prevErrors, comment: null }));
      }
    };
  
  const handleSubmit = async (event) => {
  event.preventDefault();
  if (!rating || !comment) {
    swal.fire({
      title: "Error",
      text: "You must complete all fields",
      icon: "warning",
      buttons: "Ok",
    });
  } else {
    const FormData = {
      score: parseInt(rating),
      comment: comment,
      idUser: User.data_user.id,
    };

    dispatch(postReviews(productId, FormData)).then((response) => {
      console.log("response es: ", response)
      swal.fire({
        title: "Message",
        text: response.data,
        icon: "success",
        buttons: "Ok",
      })
    } )
    .catch((error) => {
      // console.log("error es: ", error)
      swal.fire({
        title: "Message",
        text: error.response.data,
        icon: "error",
        buttons: "Ok",
      })
    })      
    
    setRating("");
    setComment("");
    
  }
};

  const handleSubmit2 = (event) => {
    event.preventDefault();
   if( !rating || !comment){
    swal.fire({
      title: "Error",
      text: "You must complete all fields",
      icon: "warning",
      buttons: "Ok",
    });
   }
   else{
     const FormData = {
       score: parseInt(rating),
       comment:comment,
       idUser: User.data_user.id
     };
    dispatch(postReviews(productId,FormData)) 
    console.log("msg es:", msg)
    swal.fire({
      title: "Message",
      text: "Review",
      icon: "success", 
      buttons: "Ok",
    });
    
    setRating("");
    setComment("");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
}
  };


  return (

    <div className='bg-gray-100 dark:bg-gray-800 w-full'>

      <Header />


      <div className='contenedorReview bg-gray-100 dark:bg-gray-800 h-[calc(100vh-12rem)}'>

        <div className='bg-gray-100 mb-4 mt-10'>
       {
        product?.map(p=>{
         return(
          <>
          <img className='imgProduct' src={p.image} />
           < p key={p.id} className='productName'>{p.name}</p>
          </>
         )
        })
       }
      </div>
     
      <form className='form-review mb-10'  onSubmit={handleSubmit}>
        <label htmlFor="" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>Score</label>
        <div className="rating">
        <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange} />
        <label htmlFor="star5"><FaStar /></label>
        <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange}/>
        <label htmlFor="star4"><FaStar /></label>
        <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange} />
        <label htmlFor="star3"><FaStar /></label>
        <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange}/>
        <label htmlFor="star2"><FaStar /></label>
        <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange} />
        <label htmlFor="star1"><FaStar /></label>
       </div>
      
       {error.rating && <p className="error">{error.rating}</p>}
        <label htmlFor="" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>Comment</label>
        <textarea onBlur={handleBlurComment} className='rounded text-pink-500'  cols="30" rows="10" value={comment}  onChange={(event) => setComment(event.target.value)}></textarea>
        {error.comment && <p style={{ color: "red",  }}>{error.comment}</p>}
        <button className='send' >Send</button>
      </form>
    </div>

       <Footer />
    </div>
  )
}
