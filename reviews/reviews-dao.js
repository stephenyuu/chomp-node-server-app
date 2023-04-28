import reviewsModel from "./reviews-model.js";

export const createReview = async (review) => {
  const newReview = await reviewsModel.create(review);
  return newReview;
};

export const findReviewsByRxId = async (rxId) => {
  const reviews = await reviewsModel.find({ rxId });
  return reviews;
};

export const findReviewsByUserId = async (userId) => {
  const reviews = await reviewsModel.find({ userMongooseKey: userId });
  return reviews;
};

export const deleteReview = async (reviewId) => {
  const status = await reviewsModel.deleteOne({ _id: reviewId });
  return status;
};

export const updateReview = async (id, user) => {
  const status = await reviewsModel.updateOne({ _id: id }, user);
  return status;
};
