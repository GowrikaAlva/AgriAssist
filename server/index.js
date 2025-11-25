import express from "express";
import * as tf from "@tensorflow/tfjs-node";  // <-- CHANGE HERE
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

// --- CUSTOM FETCH FOR FILE:// URLs ---
global.fetch = async function (url) {
  if (url.startsWith("file://")) {
    const filePath = url.replace("file://", "");
    const data = fs.readFileSync(filePath);
    return {
      ok: true,
      arrayBuffer: async () => data,
      json: async () => JSON.parse(data),
    };
  }

  return (await import("undici")).fetch(url);
};
// ------------------------------------

let model;
let labels = [];

async function loadModel() {
  console.log("Loading TensorFlow model...");

  const modelDir = path.join(__dirname, "models", "plant");
  const modelPath = path.join(modelDir, "model.json");
  const labelsPath = path.join(modelDir, "labels.json");

  const modelURL = "file://" + modelPath.replace(/\\/g, "/");

  model = await tf.loadLayersModel(modelURL);
  labels = JSON.parse(fs.readFileSync(labelsPath, "utf-8"));

  console.log("Model & Labels loaded successfully!");
}

loadModel();

// --- PREDICT ROUTE ---
app.post("/predict", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Preprocess image
    const resizedImage = await sharp(req.file.buffer)
      .resize(224, 224)
      .toFormat("png")
      .toBuffer();

    const tensor = tf.node
      .decodeImage(resizedImage, 3) // decodeImage exists in tfjs-node
      .expandDims(0)
      .toFloat()
      .div(255.0);

    const predictions = model.predict(tensor).dataSync();
    const maxIndex = predictions.indexOf(Math.max(...predictions));

    const result = {
      disease: labels[maxIndex],
      confidence: predictions[maxIndex],
      recommendation: "Use organic fungicide and remove infected leaves."
    };

    tensor.dispose();

    return res.json(result);

  } catch (error) {
    console.error("PREDICTION ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

// ----------------------

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
