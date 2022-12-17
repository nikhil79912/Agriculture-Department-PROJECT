const express = require('express');
const route = express.Router();
const middleware = require('../middleware/auth')
const organizationController = require('../controller/organizationController')


route.post("/createOrganization",organizationController.createOrganization )


route.post("/organizationLogin",organizationController. organizationLogin)


module.exports = route;



