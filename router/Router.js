const express = require('express');
const router = express.Router();
const { awsService } = require('../model/awsModel');

// getting all data
const getAllData = require('../controller/allData');

router.route('/').get(getAllData);

// get and manipulate service types
const {
    getAllServiceTypes,
    createServiceType,
    deleteAServiceType,
    editAServiceType,
} = require('../controller/serviceType');

router
    .route('/:cloudPlatform')
    .get(getAllServiceTypes)
    .post(createServiceType)
    .delete(deleteAServiceType)
    .patch(editAServiceType);

// get all services in a service type and manipulate them
const getAServiceType = require('../controller/allServiceInserviceType');

router
    .route('/:cloudPlatform/:serviceType')
    .get(getAServiceType);

module.exports = router;
