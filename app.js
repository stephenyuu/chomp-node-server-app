import express from "express";
import cors from "cors";
import RxController from "./controllers/restaurant-controller.js";

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 4000;

RxController(app);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost: ${PORT}`);
});
