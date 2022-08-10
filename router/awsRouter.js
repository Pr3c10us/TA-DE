const express = require('express');
const router = express.Router();
const { awsService } = require('../model/awsModel');

// getting all data
const {
    getAllData,
    getAllServiceTypes,
    createServiceType,
} = require('../controller/All Controller/serviceTypeController');

router.route('/').get(getAllData);
router
    .route('/:cloudPlatform')
    .get(getAllServiceTypes)
    .post(createServiceType);

module.exports = router;
