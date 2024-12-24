import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const BookReview = () => {
  const { user } = useSelector((state) => state.auth); 
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = useSelector((state) => state.auth.token); 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.rating || !formData.reviewText) {
      alert("All fields are required!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews/registerreview", 
        {
          bookTitle: formData.title,
          author: formData.author,
          rating: formData.rating,
          reviewText: formData.reviewText,
          userID: user.userID,  
          date: new Date().toLocaleDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  
          },
        }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [response.data.review, ...prevReviews]);
        setFormData({
          title: "",
          author: "",
          rating: "",
          reviewText: "",
        });
        alert("Review added successfully!");
      } else {
        setErrorMessage(response.data.message || "Failed to submit review");
      }
    } catch (error) {
      setErrorMessage("Error submitting review: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className=" justify-center  items-center font-[sans-serif] h-full min-h-screen p-4">
      <h1 className="text-2xl font-extrabold text-bluedark text-center mb-6">Add New Book Review</h1>
      <div className="bg-lightblue2 rounded-2xl shadow-lg w-full max-w-screen-xl p-6">
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="title">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border rounded-full px-3 py-2"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="w-full border rounded-full px-3 py-2"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="rating">
              Rating (1-5)
            </label>
            <select
              id="rating"
              name="rating"
              className="w-full border rounded-full px-3 py-2"
              value={formData.rating}
              onChange={handleInputChange}
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="reviewText">
              Review
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              className="w-full border rounded-full px-3 py-2"
              value={formData.reviewText}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="mb-2 py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full bg-black text-white hover:bg-grey hover:text-black focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add Review"}
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-bold">{review.title}</h2>
            <p className="text-gray-700">by {review.author}</p>
            <p className="text-yellow-500">
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </p>
            <p className="mt-2">{review.reviewText}</p>
            <p className="text-sm text-gray-500">Added on: {review.dateAdded}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default BookReview;
