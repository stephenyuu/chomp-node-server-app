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
  
  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.username);
    res.json(user);
  };

  const findUserByUserId = async (req, res) => {
    const user = await dao.findUserByUserId(req.params.userid);
    res.json(user);
  }

  const deleteAccount = async (req, res) => {
    const status = await dao.deleteAccount(req.params.userId);
    res.send(status);
  };

  app.get("/api/users/profile", profile);
  app.get("/api/users/username/:username", findUserByUsername);
  app.get("/api/users/id/:userid", findUserByUserId);
  app.post("/api/users/login", login);
  app.post("/api/users/register", register);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/delete/:userId", deleteAccount);

};

export default UserController; 
