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

  export const updateUser = async (id, user) => {
    const status = await usersModel.updateOne({ _id: id }, user);
    return status;
  };

  export const deleteAccount = async (userId) => {
    const status = await usersModel.findByIdAndDelete(userId)
    return status;
  };