import axios from "axios";
import dotenv from "dotenv";
import * as rxDao from "../rxs/rxs-dao.js"

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

    let rx = await rxDao.findAlbumByRxId(req.params.rxId);
    if (!rx) {
      rx = await rxDao.createAlbum(req.body);
    }
    const like = await likesDao.createLike({
      userId: currentUser._id,
      rxId: rx.rxId,
      albumMongooseKey: rx._id,
    });
    res.json(like);
  };

  app.post("/api/restauranks/:rxId/likes", likeRx);

  app.get("/api/restaurants", findRxs);
  app.get("/api/restaurants/:rxid", findRxDetails);
};

export default RxsController;
