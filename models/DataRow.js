const mongoose = require("mongoose");

const DataRowSchema = new mongoose.Schema({
  rowIndex: { type: Number, required: true, unique: true },
  data: { type: [String], required: true },
  date: { type: String, default: "" },
  status: { type: String, default: "Not Interested" },
  comments: { 
    type: [
      {
        text: { type: String, required: true },
        timestamp: { type: String, required: true },
      }
    ],
    default: [],
  },
  voiceData: { 
    type: [
      {
        audio: { type: String, required: true }, // Base64-encoded audio
        timestamp: { type: String, required: true },
      }
    ],
    default: [],
  },
  step: { type: String, default: "Step1" },
});

module.exports = mongoose.model("DataRow", DataRowSchema);
