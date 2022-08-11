const express = require('express');
const app = express();
const router = express.Router();
const { awsService } = require('../model/awsModel');

// getting all data
const getAllData = require('../controller/allData');

router.route('/').get(getAllData);

// get service types
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

// get services in a service type
const getAServiceType = require('../controller/allServiceInserviceType');

router
    .route('/:cloudPlatform/:serviceType')
    .get(getAServiceType);

module.exports = router;
