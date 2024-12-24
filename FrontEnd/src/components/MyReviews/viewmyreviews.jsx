import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const ViewMyReviews = ({ reviewData, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState(reviewData); 
  const token = useSelector((state) => state.auth.token); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const reviewId = formData.id; 
      const response = await axios.put(
        `http://localhost:5000/api/reviews/updatereview/${reviewId}`, 
        {
          bookTitle: formData.bookTitle,
          author: formData.author,
          date: formData.dateAdded, 
          rating: formData.rating,
          reviewText: formData.reviewText,
          userID: formData.userID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (response.status === 200) {
        alert("Review updated successfully!");
        onEdit(formData); 
        setIsEditing(false); 
      } else {
        alert("Failed to update the review. Please try again.");
      }
  
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update the review. Please try again.");
    }
  };
  
  const handleDelete = async () => {
    try {
      const reviewId = reviewData.id; 
      const response = await axios.delete(
        `http://localhost:5000/api/reviews/deletereview/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200) {
        alert("Review deleted successfully!");
        onDelete(reviewData.id); 
      } else {
        alert("Failed to delete the review. Please try again.");
      }

    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete the review. Please try again.");
    }
  };

  return (
    <div className="bg-lightblue2 shadow-md rounded-3xl p-6 my-4 text-gray-700">
      <h3 className="text-lg font-bold">{reviewData.bookTitle}</h3>
      <p><strong>Author:</strong> {reviewData.author}</p>
      <p>
        <strong>Rating:</strong> {"★".repeat(reviewData.rating) + "☆".repeat(5 - reviewData.rating)}
      </p>
      <p><strong>Review:</strong> {reviewData.reviewText}</p>
      <p className="text-sm text-gray-500">
        <strong>Date Added:</strong> {reviewData.dateAdded}
      </p>
      <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          onClick={handleDelete} 
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="title">
                  Book Title
                </label>
                <input
                  type="text"
                  id="bookTitle" 
                  name="bookTitle" 
                  className="w-full border rounded-full px-3 py-2"
                  value={formData.bookTitle} 
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
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyReviews;
