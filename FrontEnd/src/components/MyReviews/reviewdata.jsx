import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ViewMyReviews from "./viewmyreviews";

const MyReviewList = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/reviews/getreviewofuser/${user.userID}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews); 
        } else {
          setError("The reviews data is not in the expected format.");
        }
      } catch (err) {
        setError("Failed to fetch reviews: " + err.message);
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    if (user && token) {
      fetchReviews(); 
    }
  }, [token, user]); 

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleEdit = (updatedReview) => {
    setReviews(
      reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  return (
    <div className="my-4 p-6">
      <h1 className="text-2xl font-bold text-center">My Reviews</h1>

      {/* Loading and error state */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display reviews */}
      {reviews.length === 0 ? (
        <p className="text-center">You have not written any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ViewMyReviews
            key={review.id} 
            reviewData={review}
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            navigate("/dashboard", { state: { selectedItem: "BookReview" } }) 
          }
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Add New Review
        </button>

      </div>
    </div>
  );
};

export default MyReviewList;
