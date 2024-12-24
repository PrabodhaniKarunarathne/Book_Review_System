import React from "react";

const ViewReviews = ({ reviewData}) => {
  return (
    <div className="bg-lightblue2 shadow-md rounded-3xl p-6 my-4 text-gray-700">
      <h3 className="text-lg font-bold">{reviewData.title}</h3>
      <p><strong>Author:</strong> {reviewData.author}</p>
      <p>
        <strong>Rating:</strong> {"★".repeat(reviewData.rating) + "☆".repeat(5 - reviewData.rating)}
      </p>
      <p><strong>Review:</strong> {reviewData.reviewText}</p>
      <p className="text-sm text-gray-500">
        <strong>Date Added:</strong> {reviewData.dateAdded}
      </p>
      
    </div>
  );
};

export default ViewReviews;
