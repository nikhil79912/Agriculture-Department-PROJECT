const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({

    soiltype: {
        type: String,
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
    region :{
        type: String,
        required : true
    }



}, { timestamps: true })

module.exports = mongoose.model("crop", cropSchema);