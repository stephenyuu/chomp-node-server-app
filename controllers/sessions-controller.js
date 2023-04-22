import * as dao from "../sessions/sessions-dao.js";

const SessionController = (app) => {

  const createSession = async (req, res) => {
    const session = req.body;
    const existingSession = await dao.findSessionByCode(session.groupSessionCode);
    if (existingSession) {
      res.sendStatus(409);
      return;
    }
    const newSession = await dao.createSession(session);
    res.json(newSession);
  };

  const joinSession = async (req, res) => {
    const session = await dao.findSessionByCode(req.params.code);
    if (session) {
      res.json(session);
    } else {
      res.sendStatus(401);
    }
  };
  

  app.post("/api/sessions/createSession", createSession);
  app.put("/api/sessions/join/:code", joinSession);

};

export default SessionController; 
