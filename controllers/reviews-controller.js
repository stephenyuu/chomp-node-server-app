import * as reviewDao from "../reviews/reviews-dao.js";
import * as rxDao from "../rxs/rxs-dao.js";

const ReviewsController = (app) => {
  const findRxReviewsById = async (req, res) => {
    const reviews = await reviewDao.findReviewsByUserId(req.params.userid);
    res.json(reviews);
  };

  app.get("/api/reviews/:userid", findRxReviewsById);
};

export default ReviewsController;
