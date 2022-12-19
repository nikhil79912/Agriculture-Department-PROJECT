const cropModel = require("../model/cropModel");
const {isValid } = require("../validation/validation")

const createCrop = async function (req, res) {
    try{
        const data = req.body;
        const {soiltype, season, cropName, region} = data

        if (Object.keys(data).length === 0)
        return res.status(400).send({status: false, msg: "provide data"})

        if(!isValid(soiltype)) 
        return res.status(400).send({status: false, msg: "provide soiltype"})

        if (!isValid(season))
        return res.status(400).send({status:false, msg:"provide season"})

        if (!isValid(cropName))
        return res.status(400).send({status:false, msg:"provide Cropname"})

        let checkcrop = await cropModel.findOne({ cropName: cropName })
        if (checkcrop) return res.status(400).send({ status: false, msg: "cropname is already exist" })

        if (!isValid(region))
        return res.status(400).send({status:false, msg:"provide region"})


        const theCrop = {
            soiltype,
            season,
            cropName,
            region
        }

        if (!['East', 'West', 'North', 'South'].includes(theCrop.region)) {
            return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}" })
        }

        if (!['alluvial' , 'black' , 'red' , 'laterite' ,'arid'].includes(theCrop.soiltype)) {
            return res.status(400).send({ status: false, Message: "Soil Type must be from {alluvial , black , red , laterite ,arid}" })
        }


        // let array = region.split(",").map(x => x.trim())

        // for (let i = 0; i < array.length; i++) {
        //     if (!(['East' , 'West' , 'North' , 'South'].includes(array[i]))) {
        //         return res.status(400).send({ status: false, message: `region must be among ${['East' , 'West' , 'North' , 'South']}` })         
        //     }
        // }
        // if (Array.isArray(array)) {
        //     theCrop['region'] = array
        // }



        // let orray = soiltype.split(",").map(x => x.trim())

        // for (let i = 0; i < array.length; i++) {
        //     if (!(['alluvial' , 'black' , 'red' , 'laterite' ,'arid'].includes(array[i]))) {
        //         return res.status(400).send({ status: false, message: `soiltype must be among ${['alluvial' , 'black' , 'red' , 'laterite' ,'arid']}` })         
        //     }
        // }
        // if (Array.isArray(orray)) {
        //     theCrop['soiltype'] = orray
        // }



        // let nrray = soiltype.split(",").map(x => x.trim())

        // for (let i = 0; i < array.length; i++) {
        //     if (!(['Kharif','Rabi','Zaid'].includes(array[i]))) {
        //         return res.status(400).send({ status: false, message: `soiltype must be among ${['Kharif','Rabi','Zaid']}` })         
        //     }
        // }
        // if (Array.isArray(nrray)) {
        //     theCrop['season'] = nrray
        // }



        const savedata = await cropModel.create(theCrop)
        return res.status(201).send({ status: true, message: "crop created successfully", data: savedata })
    }
    catch (err) {
        res.status(500).send({msg: "Error", error: err.message})
    }
}

module.exports = {createCrop};