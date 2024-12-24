const {createReview,searchReviews,getReviewByReviewID,getReviews,updateReviewByReviewID,deleteReviewByReviewID,getReviewsByUserID} = require('../models/review.model');
const Review = require('../models/review.class');

const registerReview = async (req, res) => {
    const {
        bookTitle,
        author,
        date,
        rating,
        reviewText,
        userID} = req.body;
    
    const newReview = new Review(
        bookTitle,
        author,
        date,
        rating,
        reviewText,
        userID
    );
    try{
        const savedReview = await createReview(newReview);
        console.log('Review added:', savedReview.reviewID);
        return res.status(201).json({ message: 'Review created successfully', review: savedReview });

    }catch(error){
        console.error('Error saving Review:', error);
    return res.status(500).json({ message: 'Error saving Review', error: error.message });
    }
};

const deleteReview = async (req, res) => {
  try {
      const reviewID = req.params.id;  

      const result = await deleteReviewByReviewID(reviewID);
      console.log('Review deleted:', reviewID);
      return res.status(200).json({ message: 'Review deleted successfully', result }); 
  } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
};


const updateReview = async (req, res) => {
  try {
    const reviewID = req.params.id; 
    const updatedData = req.body; 
    console.log("The id in controller update",req.params.id);
    console.log("The id in controller update",req.body.id);
    if (!reviewID || !updatedData) {
      return res.status(400).json({ message: 'Invalid request. Missing review ID or data.' });
    }

    const updatedReview = await updateReviewByReviewID(reviewID, updatedData);

    return res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({
      message: 'Failed to update review',
      error: error.message,
    });
  }
};


const getReview = async (req, res) => {
    const { reviewID } = req.params; 
    try {
      const review = await getReviewByReviewID(reviewID); 
      if (review) {
        return res.status(200).json({ review });
      } else {
        return res.status(404).json({ message: 'Review not found' });
      }
    } catch (error) {
      console.error('Error fetching review by reviewID:', error);
      return res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
  };

  const getAllReviews = async (req, res) => {
    try {
      const reviews = await getReviews(); 
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found' });
      }
  
      return res.status(200).json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews from database:', error);
      return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
  };

  const getReviewsofUser = async (req, res) => {
    const { userID } = req.params; 
  
    try {
      const reviews = await getReviewsByUserID(userID); 
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for the specified user' });
      }
      return res.status(200).json({ reviews }); 
    } catch (error) {
      console.error('Error fetching reviews by userID:', error);
      return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
  };

  const searchReviewsController = async (req, res) => {
    const { bookTitle, author, rating } = req.query; 
  
    try {
      const filters = {
        bookTitle: bookTitle || null,
        author: author || null,
        rating: rating ? parseInt(rating) : null, 
      };
  
      const reviews = await searchReviews(filters);
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No matching reviews found' });
      }
  
      return res.status(200).json({ reviews });
    } catch (error) {
      console.error('Error searching reviews:', error);
      return res.status(500).json({ message: 'Error searching reviews', error: error.message });
    }
  };


module.exports ={
    registerReview,
    getAllReviews,
    getReview,
    deleteReview,
    updateReview,
    getReviewsofUser,
    searchReviewsController
}