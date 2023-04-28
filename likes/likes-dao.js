import likesModel from "./likes-model.js";

export const createLike = async (like) => {
  const newLike = await likesModel.create(like);
  return newLike;
};

export const undoLike = async ({ rxId, userMongooseKey }) => {
  const status = await likesModel.deleteOne({ rxId, userMongooseKey });
  return status;
};

export const findLikesByUserId = async (userId) => {
  const likes = await likesModel.find({userMongooseKey : userId});
  return likes;
};

export const findLikesByRxId = async (rxId) => {
  const likes = await likesModel.find({ rxId });
  return likes;
};

export const findLikesByCredentials = async ({ rxId, userId }) => {
  const relationship = await likesModel.findOne({ rxId, userId });
  return relationship;
};
