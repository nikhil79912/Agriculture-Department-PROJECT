const express = require('express');
const route = express.Router();
const middleware = require('../middleware/auth')
const cropController = require('../controller/cropController')
const organizationController = require('../controller/organizationController')
const RegionController = require('../controller/regionController')

route.post("/createCrop",cropController.createCrop)

route.post("/createOrganization",organizationController.createOrganization)

route.post("/organizationLogin",organizationController. organizationLogin)

route.post("/createRegion/:organizationId",middleware.Authenticate, RegionController.createRegion )

route.get("/getDetails" , middleware.Authenticate,RegionController.getOrganization)

route.put("/updateRegion/:organizationId", middleware.Authenticate,middleware.Authorization,RegionController.updateRegion)

route.delete("/deleteRegion/:organizationId",middleware.Authenticate,middleware.Authorization ,RegionController.deleteRegion)

module.exports = route;



