import users from "./users.js";
import * as dao from "../../users/users-dao.js";

const UserController = (app) => {
    const createUser = async (req, res) => {
        const user = req.body;
        // users.push(user);
        const newUser = await dao.createUser(user);
        res.json(newUser);
      };
}