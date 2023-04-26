import * as reviewDao from "../reviews/reviews-dao.js";
import * as rxDao from "../rxs/rxs-dao.js";

const ReviewsController = (app) => {

  const reviewRx = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { review } = req.body;

    let rx = await rxDao.findRxByRxId(req.params.rxid);

    if (!rx) {
      rx = await rxDao.createRx(req.body);
    }

    const newReview = await reviewsDao.createReview({
      userId: currentUser._id,
      rxMongooseKey: rx._id,
      rxId: rx.rxId,
      review,
    });

    res.json(newReview);
  };

  // finds the REVIEWS by user ID
  const findReviewsByUserId = async (req, res) => {
    const reviews = await reviewDao.findReviewsByUserId(req.params.userid);
    res.json(reviews);
  };

  app.put("/api/reviews/:rxid/", reviewRx);
  app.get("/api/reviews/:userid", findReviewsByUserId);

};

export default ReviewsController;
