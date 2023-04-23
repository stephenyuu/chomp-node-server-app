import rxModel from "./rxs-model.js";

export const findRxByRxId = async (rxId) => { 
  return await rxModel.findOne({ rxId:rxId })
};

export const createRx = async (rx) => {
  const newRx = await rxModel.create(rx);
  return newRx;
};