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
            enum: ['East' , 'West' , 'North' , 'South'],
            field: {
                size : {
                    type : Number ,
                    default : sqft ,
                    required : true
                }
            }
        },

    }


}, { timestamps: true })

module.exports = mongoose.model("organization", organizationSchema);