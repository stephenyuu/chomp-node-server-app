import express from "express";
import cors from "cors";
import RxsController from "./controllers/rxs-controller.js";
import UserController from "./controllers/users-controller.js";
import mongoose from "mongoose";
import session from "express-session";
import SessionController from "./controllers/sessions-controller.js";

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/chomp";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    //    origin:"*",
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
const PORT = process.env.PORT || 4000;

RxsController(app);
UserController(app);
SessionController(app);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost: ${PORT}`);
});
