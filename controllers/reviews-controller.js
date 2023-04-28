import * as reviewDao from "../reviews/reviews-dao.js";
import * as rxDao from "../rxs/rxs-dao.js";

const ReviewsController = (app) => {

  const reviewRx = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const reviewText = req.body.text;

    let rx = await rxDao.findRxByRxId(req.params.rxid);

    if (!rx) {
      rx = await rxDao.createRx({name: req.params.rxname, rxId: req.params.rxid});
    }

    const newReview = await reviewDao.createReview({
      userMongooseKey: currentUser._id,
      rxMongooseKey: rx._id,
      rxId: rx.rxId,
      rxName: rx.name,
      review: reviewText,
    });

    res.json(newReview);
  };

  const findReviewsOfRx = async (req, res) => {
    const reviews = await reviewDao.findReviewsByRxId(req.params.rxid);
    res.json(reviews);
  }

  const findReviewedRxsOfUser = async (req, res) => {
    const reviews = await reviewDao.findReviewsByUserId(req.params.userid);
    res.json(reviews);
  };

  const updateReview = async (req, res) => {
    const review = req.body.text;
    const status = await reviewDao.updateReview(req.params.reviewid, review);
    res.send(status);
  };

  const deleteReview = async (req, res) => {
    const status = await reviewDao.deleteReview(req.params.reviewid);
    res.send(status);
  };

  app.post("/api/reviews/:rxid/:rxname", reviewRx);
  app.put("/api/reviews/:reviewid", updateReview)
  app.get("/api/reviews/rxs/:rxid", findReviewsOfRx);
  app.get("/api/reviews/user/:userid", findReviewedRxsOfUser);
  app.delete("/api/reviews/delete/:reviewid", deleteReview);

};

export default ReviewsController;
