import * as rxDao from "../rxs/rxs-dao.js";
import * as likesDao from "../likes/likes-dao.js";

const LikesController = (app) => {
  const likeRx = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    let rx = await rxDao.findRxByRxId(req.params.rxid);

    if (!rx) {
      rx = await rxDao.createRx(req.body);
    }

    const like = await likesDao.createLike({
      userId: currentUser._id,
      rxId: rx.rxId,
      rxMongooseKey: rx._id,
    });
    res.json(like);
  };

  const undoLikeRx = async (req, res) => {
    const status = await likesDao.undoLike({
      rxId: req.params.rxid,
      userId: req.params.userid,
    });
    res.send(status);
  };

  const isRxLikedByUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const liked = await likesDao.findLikesByCredentials({
      rxId: req.params.rxid,
      userId: req.params.userid,
    });
    res.json(liked);
  };

  const findLikedRxsOfUser = async (req, res) => {
    const liked = await likesDao.findLikesByUserId(req.params.userid);

    const rxDetails = await Promise.all(
      liked.map(async (rx) => {
        const response = await rxDao.findRxByRxId(rx.rxId);
        return response;
      })
    );

    res.json(rxDetails);
  };

  const findLikesOfRx = async (req, res) => {
    const likes = await likesDao.findLikesByRxId(req.params.rxid);
    res.json(likes);
  }

  app.post("/api/likes/:rxid", likeRx);
  app.post("/api/likes/:rxid/:userid", isRxLikedByUser);
  app.delete("/api/likes/undo/:rxid/:userid", undoLikeRx);
  app.get("/api/likes/user/:userid", findLikedRxsOfUser);
  app.get("/api/likes/rxs/:rxid", findLikesOfRx);
};

export default LikesController;
