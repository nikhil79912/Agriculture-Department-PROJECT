const mongoose = require("mongoose");


const organizationSchema = new mongoose.Schema({


    organizationName: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    property: {
        region: {
            type: String,
            enum: [],
            field: {
                type: String,
            }
        },

    }



}, { timestamps: true })

module.exports = mongoose.model("organization", organizationSchema);