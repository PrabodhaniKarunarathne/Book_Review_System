const express = require('express');
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth');  

const reviewRouter = express.Router();

reviewRouter.post('/registerreview',auth.verifyToken,reviewController.registerReview);
reviewRouter.put('/updatereview/:id', auth.verifyToken, reviewController.updateReview);
reviewRouter.get('/getreview/:id', auth.verifyToken, reviewController.getReview); 
reviewRouter.get('/getallreviews', auth.verifyToken,reviewController.getAllReviews); 
reviewRouter.get('/getreviewofuser/:userID', auth.verifyToken, reviewController.getReviewsofUser); 
reviewRouter.delete('/deletereview/:id', auth.verifyToken, reviewController.deleteReview);  
reviewRouter.get('/search', auth.verifyToken,reviewController.searchReviewsController);


module.exports = reviewRouter;