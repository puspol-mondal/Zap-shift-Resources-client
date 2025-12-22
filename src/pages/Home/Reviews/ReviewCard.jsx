import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Rating from "./Rating";

const ReviewCard = (r) => {
  console.log(r);
  const { userName, ratings, review } = r.r;

  return (
    <div className="card bg-base-100 shadow-xl max-w-sm">
      <div className="card-body">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-3xl text-primary mb-2" />

        {/* Review Text */}
        <p className="text-gray-600">{review}</p>

        {/* Rating */}
        <div className="flex gap-1 mt-3 text-warning">
          <Rating rating={ratings} />
        </div>

        {/* Reviewer */}
        <div className="flex items-center gap-3 mt-4">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pravatar.cc/100" alt="Reviewer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold">{userName}</h4>
            <p className="text-sm text-gray-500">Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
