class Review{
    constructor(
        bookTitle,
        author,
        date,
        rating,
        reviewText,
        userID
    ){
        this.bookTitle = bookTitle;
        this.author = author,
        this.date = date,
        this.rating = rating,
        this.reviewText = reviewText,
        this.userID = userID
    }
}

module.exports = Review;