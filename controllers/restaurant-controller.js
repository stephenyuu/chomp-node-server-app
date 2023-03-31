import axios from "axios";

const YELP_RXS_REST_API_URL = "https://api.yelp.com/v3";
const HEADER = {
  headers: {
    Authorization: `Bearer Wm0L8O-5Vq0xe6Q0qW37yUeC8DzlJVsD7NSXy4g8alZDLXKf7o_20n7hijKvgG0twYcWl_0oVlTC8JXt9cedwQzriGyhT74ZeCEl8vVWBUM8AGrenC9NOFZeEJUkZHYx`,
  },
};

const RxController = (app) => {
  const findRxs = async (req, res) => {
    const { term, location, priceRange } = req.query;

    let apiQuery = `${YELP_RXS_REST_API_URL}/businesses/search?`;
    if (term) {
      apiQuery += `term=${encodeURIComponent(term)}&`;
    }
    if (location) {
      apiQuery += `location=${encodeURIComponent(location)}&`;
    }
    if (priceRange) {
      apiQuery += `price=${encodeURIComponent(priceRange)}`;
    }

    const response = await axios.get(apiQuery, HEADER);
    res.json(response.data.businesses);
  };

  app.get("/api/restaurants", findRxs);
};

export default RxController;
