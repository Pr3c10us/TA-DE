const express = require('express');
const app = express();
const router = express.Router();
const { awsService } = require('../model/awsModel');

// getting all data
const getAllData = require('../controller/All Controller/allDataController');

router.route('/').get(getAllData);

// get service types
const {
    getAllServiceTypes,
    createServiceType,
} = require('../controller/All Controller/serviceTypeController');


router
    .route('/:cloudPlatform')
    .get(getAllServiceTypes)
    .post(createServiceType);

module.exports = router;
