import rxModel from "./rxs-model.js";

export const findAlbumByRxId = async (rxId) =>
  await rxModel.findOne({ rxId });

export const createRx = async (rx) => {
  const newRx = await rxModel.create(rx);
  return newRx;
};