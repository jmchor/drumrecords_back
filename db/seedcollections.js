const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const Record = require("../models/Record.model");

// Connect to MongoDB database
const mongoURL = 'mongodb+srv://jchorzempa:dfOJiF2bxPA7Ba7c@drumrecordscluster.4praam0.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/drumrecords_back';

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an array of collection data
const collectionData = [
  {
    name: "Fills",
    records: [
      // Array of record object IDs related to "Fills" collection
    ],
  },
  {
    name: "Double Stroke Rolls",
    records: [
      // Array of record object IDs related to "Grooves" collection
    ],
  },
  {
    name: "Paradiddles",
    records: [
      // Array of record object IDs related to "Paradiddles" collection
    ],
  },
  {
    name: "Patterns",
    records: [
      // Array of record object IDs related to "Patterns" collection
    ],
  },
  {
    name: "Songs",
    records: [
      // Array of record object IDs related to "Songs" collection
    ],
  },
  {
    name: "Techniques",
    records: [
      // Array of record object IDs related to "Techniques" collection
    ],
  },
  {
    name: "Stick Tricks",
    records: [
      // Array of record object IDs related to "Stick Tricks" collection
    ],
  },
  {
    name: "Other",
    records: [
      // Array of record object IDs related to "Other" collection
    ],
  },
];

// Create the collections and associate records
async function seedCollections() {
  try {
    // Create collections using the collectionData array
    const createdCollections = await Collection.create(collectionData);

    // Iterate through the created collections and associate records
    for (let i = 0; i < createdCollections.length; i++) {
      const collection = createdCollections[i];
      const collectionName = collection.name;

      // Find the corresponding records for the current collection
      const records = await Record.find({ category: collectionName });

      // Map the record object IDs to an array
      const recordIds = records.map((record) => record._id);

      // Update the current collection with the associated record IDs
      collection.records = recordIds;

      // Save the updated collection
      await collection.save();
    }

    console.log("Collections seeded successfully!");
  } catch (error) {
    console.error("Error seeding collections:", error);
  } finally {
    // Disconnect from the MongoDB database
    mongoose.disconnect();
  }
}

// Call the seedCollections function to seed the collections
seedCollections();
