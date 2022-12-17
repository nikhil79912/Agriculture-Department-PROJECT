const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const regionSchema = new mongoose.Schema({

    region: {
        type: String,
        enum: ['East', 'West', 'North', 'South'],
        field: {
            size: {
                type: Number,
                default: "sqft",
                required: true
            }
        }
    },
    cropId: {
        type: ObjectId,
        ref: 'crop'
    },
    organizationId: {
        type: ObjectId,
        ref: 'organization'
    },



}, { timestamps: true })

module.exports = mongoose.model("region", regionSchema);