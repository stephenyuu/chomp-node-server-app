import axios from "axios";
import dotenv from "dotenv";
import * as rxDao from "../rxs/rxs-dao.js"
import * as likesDao from "../likes/likes-dao.js"

dotenv.config();

const YELP_RXS_REST_API_URL = "https://api.yelp.com/v3";
const YELP_API_KEY = process.env.YELP_API_KEY;
const HEADER = {
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
};

const RxsController = (app) => {
  const findRxs = async (req, res) => {
    const { term, location, price } = req.query;

    let yelpSearchBusinessesQuery = `${YELP_RXS_REST_API_URL}/businesses/search?`;
    if (term) {
      yelpSearchBusinessesQuery += `term=${encodeURIComponent(term)}&`;
    }
    if (location) {
      yelpSearchBusinessesQuery += `location=${encodeURIComponent(location)}&`;
    }
    if (price) {
      yelpSearchBusinessesQuery += `price=${encodeURIComponent(price)}`;
    }

    const response = await axios.get(yelpSearchBusinessesQuery, HEADER);
    res.json(response.data.businesses);
  };
  
  const findRxDetails = async (req, res) => {
    const { rxid } = req.params;

    let yelpGetBusinessByIdQuery = `${YELP_RXS_REST_API_URL}/businesses/${rxid}`;

    const response = await axios.get(yelpGetBusinessByIdQuery, HEADER);
    res.json(response.data);
  };

  const likeRx = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    let rx = await rxDao.findRxByRxId(req.params.rxId);

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

    const liked = await likesDao.findLikeByCredentials({ rxId: req.params.rxId, userId: req.params.userId });
    res.json(liked);
  }

  const undoLike = async (req, res) => {
    const status = await likesDao.undoLike({ rxId: req.params.rxId, userId: req.params.userId });
    res.send(status);
  };

  const findLikedRxs = async (req, res) => {
    const liked = await likesDao.findLikesByUserId(req.params.userId);
  
    const rxDetails = await Promise.all(
      liked.map(async (rx) => {
        const response = await rxDao.findRxByRxId(rx.rxId);
        return response;
      })
    );
  
    res.json(rxDetails);
  };

  app.get("/api/restaurants", findRxs);
  app.get("/api/restaurants/:rxid", findRxDetails);
  app.post("/api/restaurants/likes:rxId", likeRx);
  app.post("/api/restaurants/:rxId/:userId", findLikeRelationship);
  app.delete("/api/restaurants/undo-like/:rxId/:userId", undoLike);
  app.get("/api/restaurants/likes-by-user/:userId", findLikedRxs);
};

export default RxsController;
