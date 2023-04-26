import React from 'react';
import { FaStar, FaRegStar,FaStarHalfAlt } from 'react-icons/fa';
import "../Reviews/reviews.css"
export const StarRating = ({ score }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(score)) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return <div className='flex flex-row text-yellow-500 text-2xl p-2'>{stars}</div>;
};


