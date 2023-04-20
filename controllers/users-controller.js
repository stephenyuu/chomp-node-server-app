import * as dao from "../users/users-dao.js";

const UserController = (app) => {

  const register = async (req, res) => {
    const user = req.body;
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
      res.sendStatus(409);
      return;
    }
    const newUser = await dao.createUser(user);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const user = await dao.findUserByCredentials(req.body);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.send(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const updateUser = async (req, res) => {
    const user = req.body;
    const status = await dao.updateUser(req.params.id, user);
    res.send(status);
  };
  

  app.post("/api/users/login", login);
  app.get("/api/users/profile", profile);
  app.post("/api/users/register", register);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:id", updateUser);

};

export default UserController; 
