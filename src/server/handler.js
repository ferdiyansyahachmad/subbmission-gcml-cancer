const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData.js");
const loadHistoryData = require("../services/loadHistoryData.js");
const InputError = require("../exceptions/InputError");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(
    model,
    image
  );
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message:
      confidenceScore >= 100 || confidenceScore < 1
        ? "Model is predicted successfully"
        : "Model is predicted successfully but under threshold. Please use the correct picture",
    data,
  });
  response.code(201);
  return response;
}

const getPredictHistoryHandler = async (request, h) => {
  try {
    const { data } = await loadHistoryData();

    return h
      .response({
        status: "success",
        data,
      })
      .code(200);
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi", 400);
  }
};

module.exports = { postPredictHandler, getPredictHistoryHandler };
