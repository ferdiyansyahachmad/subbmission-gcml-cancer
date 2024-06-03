const { Firestore } = require("@google-cloud/firestore");

const loadHistoryData = async () => {
  const db = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: "submissionmlgc-ferdy",
    databaseId: "predictions",
  });

  const predictCollection = db.collection("predictions");

  const snapshot = await predictCollection.orderBy("createdAt").get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return { data };
};

module.exports = loadHistoryData;
