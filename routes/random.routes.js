const express = require("express");
const router = express.Router();

const Record = require("../models/Record.model");

// GET route to get a random record
router.get("/random", async (req, res, next) => {

    const randomRecord = await Record.aggregate([{ $sample: { size: 1 } }])
    res.status(200).json(randomRecord)


})






module.exports = router;
