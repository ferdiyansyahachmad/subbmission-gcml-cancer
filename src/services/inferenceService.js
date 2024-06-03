const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError"); // Tambahkan ini untuk menggunakan kesalahan khusus

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const classes = ["Cancer", "Non-cancer"];

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    let label;
    let suggestion;

    if (confidenceScore < 95) {
      label = "Non-cancer";
      suggestion = "Anda sehat!";
    } else {
      const classResult = tf.argMax(prediction, 1).dataSync()[0];
      label = classes[classResult];

      if (label === "Cancer") {
        suggestion = "Segera periksa ke dokter!";
      } else {
        suggestion = "Anda sehat!";
      }
    }

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi", 400);
  }
}

module.exports = predictClassification;
