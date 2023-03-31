const YELP_REST_API_URL = "https://api.yelp.com/v3";

const RxController = (app) => {
    const findRxs = (req, res) => {
        const { term, location, priceRange } = req.body;

    };




    app.get("/api/restaurants", findBusinesses);
}

export default RxController;