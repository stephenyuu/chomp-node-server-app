import express from "express";
import cors from "cors";
import RxsController from "./controllers/rxs-controller.js";

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 4000;

RxsController(app);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost: ${PORT}`);
});
