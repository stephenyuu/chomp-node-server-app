import usersModel from "./users-model";

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
  };