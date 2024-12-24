const db = require('../config/firebase'); 
const Review = require('../models/review.class');

const createReview = async(reviewData) => {
    try{
      const newReviewID = `r${Date.now()}`;
        const newReview = new Review(
            reviewData.bookTitle,
            reviewData.author,
            reviewData.date,
            reviewData.rating,
            reviewData.reviewText,
            reviewData.userID
        );
        const reviewRef = await db.collection('reviews').add({ ...newReview });
        newReview.reviewID = reviewRef.id; 
        return newReview;
    }catch (error) {
        console.error('Error creating review:', error);
        throw new Error('Error creating review');
    }
};


const deleteReviewByReviewID = async (reviewID) => {
  try {
    const reviewRef = db.collection('reviews').doc(reviewID);  
    const snapshot = await reviewRef.get();  

    if (!snapshot.exists) {  
      throw new Error('Review not found');
    }

    await reviewRef.delete();

    return { message: 'Review deleted successfully' };
  } catch (error) {
    console.error('Error deleting Review:', error);
    throw new Error('Error deleting Review');
  }
};


  const updateReviewByReviewID = async (reviewID, updatedData) => {
    try {
      const reviewRef = db.collection('reviews').doc(reviewID); 
      const reviewSnapshot = await reviewRef.get();
  
      if (!reviewSnapshot.exists) {
        throw new Error('Review not found');
      }
  
      await reviewRef.update(updatedData);
  
      const updatedReview = { id: reviewID, ...reviewSnapshot.data(), ...updatedData };
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw new Error('Error updating review');
    }
  };

  const getReviewByReviewID = async (reviewID) => {
    try {
      const reviewRef = db.collection('reviews').where('reviewID', '==', reviewID);
      const snapshot = await reviewRef.get();
  
      if (snapshot.empty) {
        console.log('No matching Review found for reviewID:', reviewID);
        return null; 
      }
  
      const reviewDoc = snapshot.docs[0];
      return { id: reviewDoc.id, ...reviewDoc.data() };
    } catch (error) {
      console.error('Error fetching Review by reviewID:', error);
      throw new Error('Error fetching Review');
    }
  };

  const getReviews = async () => {
    try{
        const reviewRef = db.collection('reviews');
        const snapshot = await reviewRef.get();

        if(snapshot.empty){
            console.log('No Reviews found');
            return[];
        }

        const reviews = snapshot.docs.map((doc)=>(
            {
                id:doc.id,
                ...doc.data()
            }
        ));
        return reviews;

    }catch(error){
        console.error('Error fetching reviews:', error);
        throw new Error('Error fetching reviews');
    }

  };



  const getReviewsByUserID = async (userID) => {
    try {
      const reviewRef = db.collection('reviews').where('userID', '==', userID);
      const snapshot = await reviewRef.get();
  
      if (snapshot.empty) {
        console.log(`No reviews found for userID: ${userID}`);
        return [];
      }
  
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews by userID:', error);
      throw new Error('Error fetching reviews');
    }
  };

  const searchReviews = async (filters) => {
    try {
      const reviewRef = db.collection('reviews');
      let query = reviewRef;
  
      if (filters.bookTitle) {
        query = query.where('bookTitle', '==', filters.bookTitle); 
      }
      if (filters.author) {
        query = query.where('author', '==', filters.author);
      }
      if (filters.rating) {
        query = query.where('rating', '==', filters.rating); 
      }
  
      const snapshot = await query.get();
  
      if (snapshot.empty) {
        console.log('No matching reviews found.');
        return [];
      }
  
      const reviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return reviews;
    } catch (error) {
      console.error('Error searching reviews:', error);
      throw new Error('Error searching reviews');
    }
  };
  

  module.exports ={
    createReview,
    getReviewByReviewID,
    getReviews,
    deleteReviewByReviewID,
    updateReviewByReviewID,
    getReviewsByUserID,
    searchReviews,
  };