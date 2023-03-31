import express from "express";
import RxController from "./controllers/restaurant-controller";

const app = express();
const port = 4000;

RxController(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost: ${port}`);
});
