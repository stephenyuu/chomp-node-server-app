import likesModel from "./likes-model.js";

export const createLike = async (like) => {
  const newLike = await likesModel.create(like);
  return newLike;
};

export const findLikeByAlbumId = async (rxId) => {
  const likes = await likesModel.find({ rxId });
  return likes;
};

export const findLikesByUserId = async (userId) => {
  const likes = await likesModel.find({ userId });
  return likes;
};

export const findLikeByCredentials = async ({ rxId, userId }) => {
    const relationship = await usersModel.findOne({ rxId, userId });
    return relationship;
  };