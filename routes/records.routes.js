const express = require("express");
const router = express.Router();

const Record = require("../models/Record.model");
const Collection = require("../models/Collection.model");

// GET route to get a random record
router.get("/records", async (req, res, next) => {

 const recordCollections = await Collection.find().populate("records")
    res.status(200).json(recordCollections)

})

router.get("/all-records", async (req, res, next) => {
    try {
        const allRecords = await Record.find()
        res.status(200).json(allRecords)
    } catch (error) {
        next(error)
    }
})


router.post("/records/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Record.findByIdAndDelete(id)
        res.status(200).json({ message: "Record deleted" })
    } catch (error) {
        next(error)
    }
})

// POST route to create a record

router.post("/records", async (req, res, next) => {
    const { url, artist, category } = req.body;
    try {
        const newRecord = await Record.create({
            url,
            artist,
            category
        })

        const updateCollection = await Collection.findOneAndUpdate({ name: category }, { $push: { records: newRecord._id } }, { new: true })

        res.status(200).json(newRecord)
    } catch (error) {
        next(error)
    }
})




module.exports = router;
