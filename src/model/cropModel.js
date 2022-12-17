const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({

    soiltype: {
        type: String,
        enum :['alluvial' , 'black' , 'red' , 'laterite' , ''],
        required: true
    },
    season: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true,
        unique: true
    },



}, { timestamps: true })

module.exports = mongoose.model("crop", cropSchema);