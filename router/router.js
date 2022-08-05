const express = require('express');
const router = express.Router();

const awsServices = require('../AWS/controller/controller')

const awsModel = require('../AWS/model/awsModel');

router.route('/:cloudplatform').get(awsServices);

module.exports = router;
