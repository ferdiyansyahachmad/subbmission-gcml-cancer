const {
  postPredictHandler,
  getPredictHistoryHandler,
} = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000, // Set maximum payload size to 1MB
      },
    },
  },
  {
    method: "GET",
    path: "/predict/histories",
    handler: getPredictHistoryHandler,
  },
];

module.exports = routes;
