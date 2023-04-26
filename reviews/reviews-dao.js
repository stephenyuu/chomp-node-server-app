import reviewsModel from "./reviews-model";

export const createReview = async (review) => {
  const newReview = await reviewsModel.create(review);
  return newReview;
};

export const findReviewsByUserId = async (userId) => {
  const reviews = await reviewsModel.find({ userId });
  return reviews;
};

export const deleteReview = async ({ rxId, userId}) => {
    const status = await reviewsModel.deleteOne({ rxId, userId});
    return status;
  };

  export const updateReview = async (id, user) => {
    const status = await reviewsModel.updateOne({ _id: id }, user);
    return status;
  };