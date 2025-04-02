const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const DataRow = require("./models/DataRow");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Replace with your frontend URL

// Connect to MongoDB
const mongoURI = "mongodb+srv://contentsimplified4u:content%40123@cluster0.aad41.mongodb.net/salespipeline"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Get all rows
app.get("/api/dataRows", async (req, res) => {
  try {
    const dataRows = await DataRow.find();
    res.json(dataRows);
  } catch (error) {
    res.status(500).send("Error fetching data rows");
  }
});

// Get a specific row by rowIndex
app.get("/api/dataRows/:rowIndex", async (req, res) => {
  const { rowIndex } = req.params;

  try {
    const row = await DataRow.findOne({ rowIndex: parseInt(rowIndex) }); // Ensure rowIndex is treated as a number
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).send("Row not found");
    }
  } catch (error) {
    console.error("Error fetching row:", error);
    res.status(500).send("Error fetching row");
  }
});

// Update a specific row
app.put("/api/dataRows/:rowIndex", async (req, res) => {
  const { rowIndex } = req.params;
  const updatedRow = req.body;

  try {
    const row = await DataRow.findOneAndUpdate({ rowIndex }, updatedRow, { new: true });
    if (row) {
      res.status(200).send("Row updated successfully");
    } else {
      res.status(404).send("Row not found");
    }
  } catch (error) {
    res.status(500).send("Error updating row");
  }
});

// Add new rows
app.post("/api/dataRows", async (req, res) => {
  const newRows = req.body;

  try {
    if (!Array.isArray(newRows)) {
      return res.status(400).send("Invalid data format. Expected an array.");
    }
    await DataRow.insertMany(newRows);
    res.status(201).send("Rows added successfully");
  } catch (error) {
    console.error("Error adding rows:", error);
    res.status(500).send("Error adding rows");
  }
});

// Add a single new row
app.post("/api/addRow", async (req, res) => {
  const newRow = req.body;

  try {
    const createdRow = await DataRow.create(newRow);
    res.status(201).json(createdRow); // Return the created row
  } catch (error) {
    console.error("Error adding new row:", error);
    res.status(500).send("Error adding new row");
  }
});

// Update comments for a specific row
app.put("/api/dataRows/:rowIndex/comments", async (req, res) => {
  const { rowIndex } = req.params;
  const { comments } = req.body;

  try {
    if (!Array.isArray(comments)) {
      return res.status(400).send("Invalid comments format. Expected an array of objects.");
    }

    const row = await DataRow.findOneAndUpdate(
      { rowIndex: parseInt(rowIndex) }, // Ensure rowIndex is treated as a number
      { $set: { comments } },
      { new: true }
    );

    if (row) {
      res.status(200).send("Comments updated successfully");
    } else {
      res.status(404).send("Row not found");
    }
  } catch (error) {
    console.error("Error updating comments:", error);
    res.status(500).send("Error updating comments");
  }
});

// Update voice data for a specific row
app.put("/api/dataRows/:rowIndex/voiceData", async (req, res) => {
  const { rowIndex } = req.params;
  const { voiceData } = req.body;

  try {
    if (!Array.isArray(voiceData)) {
      return res.status(400).send("Invalid voiceData format. Expected an array of objects.");
    }

    const row = await DataRow.findOneAndUpdate(
      { rowIndex: parseInt(rowIndex) }, // Ensure rowIndex is treated as a number
      { $set: { voiceData } },
      { new: true }
    );

    if (row) {
      res.status(200).send("Voice data updated successfully");
    } else {
      res.status(404).send("Row not found");
    }
  } catch (error) {
    console.error("Error updating voice data:", error);
    res.status(500).send("Error updating voice data");
  }
});

// Update step for a specific row
app.put("/api/dataRows/:rowIndex/step", async (req, res) => {
  const { rowIndex } = req.params;
  const { step } = req.body;

  try {
    const row = await DataRow.findOneAndUpdate(
      { rowIndex },
      { $set: { step } }, // Update the step field
      { new: true }
    );
    if (row) {
      res.status(200).send("Step updated successfully");
    } else {
      res.status(404).send("Row not found");
    }
  } catch (error) {
    res.status(500).send("Error updating step");
  }
});

const PORT = 6001;
app.listen(PORT, () => {
  console.log(`::::::::::::Server is running::::::::::::`);
});