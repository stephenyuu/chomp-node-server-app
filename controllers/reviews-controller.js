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
      userMongooseKey: currentUser._id,
      rxMongooseKey: rx._id,
      rxId: rx.rxId,
      review,
    });

    res.json(newReview);
  };

  const findReviewsOfRx = async (req, res) => {
    const reviews = await reviewDao.findReviewsByRxId(req.params.rxid);
    res.json(reviews);
  }

  // finds the REVIEWS by user ID
  const findReviewedRxsOfUser = async (req, res) => {
    const reviews = await reviewDao.findReviewsByUserId(req.params.userid);
    res.json(reviews);
  };

  app.put("/api/reviews/:rxid/", reviewRx);
  app.get("/api/reviews/rxs/:rxid", findReviewsOfRx);
  app.get("/api/reviews/user/:userid", findReviewedRxsOfUser);

};

export default ReviewsController;
