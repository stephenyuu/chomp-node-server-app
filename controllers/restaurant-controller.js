import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const YELP_RXS_REST_API_URL = "https://api.yelp.com/v3";
const YELP_API_KEY = process.env.YELP_API_KEY;
const HEADER = {
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
};

const RxController = (app) => {
  const findRxs = async (req, res) => {
    const { term, location, price } = req.query;

    let yelpBusinessSearch = `${YELP_RXS_REST_API_URL}/businesses/search?`;
    if (term) {
      yelpBusinessSearch += `term=${encodeURIComponent(term)}&`;
    }
    if (location) {
      yelpBusinessSearch += `location=${encodeURIComponent(location)}&`;
    }
    if (price) {
      yelpBusinessSearch += `price=${encodeURIComponent(price)}`;
    }

    const response = await axios.get(yelpBusinessSearch, HEADER);
    res.json(response.data.businesses);
  };

  app.get("/api/restaurants", findRxs);
};

export default RxController;
