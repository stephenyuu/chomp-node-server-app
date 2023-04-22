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

  app.get("/api/restaurants", findRxs);
  app.get("/api/restaurants/:rxid", findRxDetails);
};

export default RxsController;
