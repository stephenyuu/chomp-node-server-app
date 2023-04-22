import sessionsModel from "./sessions-model.js";

export const createSession = async (session) => {
    const newSession = await sessionsModel.create(session);
    return newSession;
};

  export const findSessionByCode = async (groupSessionCode) => {
    const session = await sessionsModel.findOne({ groupSessionCode });
    return session;
  };