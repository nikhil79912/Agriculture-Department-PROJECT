
const mongoose = require("mongoose");
const cropModel = require("../model/cropModel");
const regionModel = require("../model/regionModel");
const organizationModel = require("../model/organizationModel")
const {  isValidObjectId } = require("../validation/validation")

//=====================create-update================

const createRegion = async function (req, res) {
    try {
        let data = req.body
        // console.log(data)
        let organizationId = req.params.organizationId
        if (!organizationId) return res.status(400).send({ status: false, Message: "Please provide the organizationId. It's mandatory." })
        // if (!isValidObjectId(organizationId)) return res.status(400).send({ status: false, Message: `'${organizationId}' is not valid please check.` })
        
        let findOrganization = await organizationModel.findById({_id : organizationId})
        if(!findOrganization) return res.status(404).send({status: false , Message : "This organization is not present."})

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Message: "Please provide some data for creation." })

        let {property , cropId} = data

        if(data.property){
            
                if (!['East', 'West', 'North', 'South'].includes(property.region)) {
                    return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}" })
                }
                // if(fieldSize != Number)
            
            // if(fieldSize){
            //     if( isNaN(property.fieldSize)) return res.status(400).send({ status: false, Message: "please provide fieldSize in Number." })
            //     property.fieldSize = property.fieldSize + "sqmt"
            // }
        }
       


        let findCrop = await cropModel.findOne({_id : cropId}).select({updatedAt: 0, __v: 0, createdAt: 0 })
        if(!findCrop) return res.status(404).send({status : false , Message : "This crop is not present in DB."})
        
        let newRegion = {
            property :property,
            cropId : findCrop
        }

        let saveDetails = await regionModel.create(newRegion)
        console.log(saveDetails)
        return res.status(201).send({status : true , Message : "Region is created successfully." , data : saveDetails})


    } catch (error) {
        console.log("catch block")
        return res.status(500).send({ status: false, Message: error.Message })
    }
}

//=====================update-region===============

const updateRegion = async function (req, res) {
    try {
        let data = req.body
        let organizationId = req.params.organizationId

        let { regionId } = data

        if (!organizationId) return res.status(400).send({ status: false, Message: "Please provide the organizationId. It's mandatory." })
        if (!isValidObjectId(organizationId)) return res.status(400).send({ status: false, Message: `'${organizationId}' is not valid please check.` })

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Message: "Please provide some data for updation." })

        let findRegion = await regionModel.findOne({ _id: data.regionId, isDeleted: false })
        if (!findRegion) return res.status(400).send({ status: false, Message: "This region is not present or might be already deleted." })

        if (!['East', 'West', 'North', 'South'].includes(data.region)) {
            return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}" })
        }

        if (data.region.field.size) {
            let newField = await regionModel.findOneAndUpdate({ _id: regionId, isDeleted: false }, { $set: { size: size } }, { new: true })
            return res.status(200).send({ status: true, Message: "Field Size is updated.", data: newField })
        }

        return res.status(200).send({ status: true, Message: "Region is updated", data: findRegion })

    } catch (error) {
        return res.status(500).send({ status: false, Message: error.Message })
    }
}

module.exports = { createRegion, updateRegion }