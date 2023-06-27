const express = require("express");
const router = express.Router();

const Record = require("../models/Record.model");
const Collection = require("../models/Collection.model");

// GET route to get a random record
router.get("/records", async (req, res, next) => {

 const recordCollections = await Collection.find().populate("records")
    res.status(200).json(recordCollections)

})



module.exports = router;
