import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getReviews } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { StarRating } from "./Star";
import "../Reviews/reviews.css";

export const Reviews = () => {

  const dispatch = useDispatch();
  const [Reviews, setReviews] = useState([]);
  let Promedio = 0;
  const { id } = useParams();

  useEffect(() => {
    dispatch(getReviews(id)).then((response) => {
        console.log("RESPUESTA", response);
        setReviews(response.data);
    })
  }, []);

  if (!Reviews.length) {
    return <p className="msg">Este producto no tiene reseñas</p>;
  }
  function PromedioFun() {
    Promedio =
      Reviews.reduce((prev, current) => prev + current.score, 0) /
      Reviews.length;

    const num = Promedio;
    const decimalPart = num % 1;
    const roundedDecimalPart = decimalPart.toFixed(2);
    // console.log(roundedDecimalPart); // Output: 0.14
    if (roundedDecimalPart > 0.5) {
      Promedio = Math.ceil(Promedio);
    } else if (roundedDecimalPart < 0.5) {
      Promedio = Math.floor(Promedio);
    }
    console.log(Promedio);
  }
  PromedioFun();

  return(
    <div>

      {
        Reviews?.map((element) => {
          return(
      <div className="container flex flex-col mb-2 w-full max-w-lg p-6 mx-auto divide-y rounded-md
       divide-gray-700 dark:bg-gray-900 dark:text-gray-100">

	      <div className="flex justify-between p-4">
		      <div className="flex space-x-4">
			      <div>
				      <img src={element?.image} alt="photo" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
			      </div>

			      <div>
              <h4 className="font-bold">{element?.name} {element?.lastname}</h4>
				      <span className="text-xs dark:text-gray-400">{element.date.split(" ")[0].substring(0, 10)}</span>
			      </div>
		      </div>

		      <div className="flex items-center space-x-2 dark:text-yellow-500">
			      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
				      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
			      </svg>
			      <span className="text-xl font-bold">{element.score}</span>
		      </div>  
	      </div>

	      <div className="p-4 space-y-2 text-sm dark:text-gray-400">
		      {element.comment}
	      </div>
    </div>

          )
        })
      }
  </div>
)};
  
  /*<div>
    <h3 className="tituloRes">Opiniones del producto</h3>
    <div className="contenedorRev ">
      <div className="prom">
        <span>{Promedio}</span> <StarRating score={Promedio} />
      </div>
      <div className="fecha">
        {reviews?.map((r) => {
          return <p key={r.id}>{r.date.slice(0, 10)}</p>;
        })}
      </div>
      <div className="estrellas">
        {reviews?.map((r) => {
          return <StarRating score={r.score} />;
        })}
      </div>
      <div className="comentarios">
        {reviews?.map((r) => {
          return <p key={r.id}>{r.comment}</p>;
        })}
      </div>
    </div>
  </div>*/