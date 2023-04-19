import usersModel from "./users-model.js";

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
  };

  export const findUserByCredentials = async ({ username, password }) => {
    const user = await usersModel.findOne({ username, password });
    return user;
  };

  export const findUserByUsername = async (username) => {
    const user = await usersModel.findOne({ username });
    return user;
  };