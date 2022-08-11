const express = require('express');
const app = express();
const router = express.Router();
const { awsService } = require('../model/awsModel');

// getting all data
const getAllData = require('../controller/All Controller/allData');

router.route('/').get(getAllData);

// get service types
const {
    getAllServiceTypes,
    createServiceType,
    deleteAServiceType,
    editAServiceType,
} = require('../controller/All Controller/serviceType');

router
    .route('/:cloudPlatform')
    .get(getAllServiceTypes)
    .post(createServiceType)
    .delete(deleteAServiceType)
    .patch(editAServiceType);

// get services in a service type
router
    .route('/:cloudPlatform/:serviceType')
    .get(async (req, res) => {
        try {
            const capitalizeFirstLetter = (string) => {
                return (
                    string.charAt(0).toUpperCase() +
                    string.slice(1)
                );
            };
            let { cloudPlatform, serviceType } = req.params;
            serviceType =
                capitalizeFirstLetter(serviceType);
            cloudPlatform = cloudPlatform.toUpperCase();

            let services = await awsService
                .findOne({
                    ServiceType: `${serviceType} Service`,
                    CloudPlatform: cloudPlatform,
                })
                .select(
                    '-_id -ServiceType -CloudPlatform -__v'
                );

            res.status(200).json({
                'Cloud Platform': cloudPlatform,
                'Service Type': `${serviceType} Service`,
                Services: services.Services,
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Some Internal issues, no vex',
            });

            console.log(error);
        }
    });

module.exports = router;
