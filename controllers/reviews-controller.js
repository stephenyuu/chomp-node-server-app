import * as dao from "../reviews/reviews-dao.js";

const ReviewsController = (app) => {
  const findRxReviewsById = async (req, res) => {
    const reviews = await dao.findReviewsByUserId(req.params.userid);
    res.json(reviews);
  };

  app.get("/api/reviews/:userid", findRxReviewsById);
};

export default ReviewsController;
