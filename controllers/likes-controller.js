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

  const findLikeRelationship = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const liked = await likesDao.findLikeByCredentials({
      rxId: req.params.rxid,
      userId: req.params.userid,
    });
    res.json(liked);
  };

  const undoLike = async (req, res) => {
    const status = await likesDao.undoLike({
      rxId: req.params.rxid,
      userId: req.params.userid,
    });
    res.send(status);
  };

  const findLikedRxs = async (req, res) => {
    const liked = await likesDao.findLikesByUserId(req.params.userid);

    const rxDetails = await Promise.all(
      liked.map(async (rx) => {
        const response = await rxDao.findRxByRxId(rx.rxId);
        return response;
      })
    );

    res.json(rxDetails);
  };

  app.post("/api/likes/:rxid", likeRx);
  app.post("/api/likes/:rxid/:userid", findLikeRelationship);
  app.delete("/api/likes/undo-like/:rxid/:userid", undoLike);
  app.get("/api/likes/likes-by-user/:userid", findLikedRxs);
};

export default LikesController;
