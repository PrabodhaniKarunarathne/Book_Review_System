import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import ViewReviews from "./ViewReviews"; 
import axios from "axios"; 

const ReviewList = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get("http://localhost:5000/api/reviews/getallreviews", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        
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

    fetchReviews();
  }, [token]); 

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-bluedark">Book Reviews List</h1>

      
      {loading && <p className="text-center text-bluedark">Loading reviews...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p className="text-center text-bluedark">No reviews found</p>
      )}

      {Array.isArray(reviews) && reviews.length > 0 && reviews.map((review) => (
        <ViewReviews key={review.reviewID} reviewData={review} />
      ))}
    </div>
  );
};

export default ReviewList;
