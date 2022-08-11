const { awsService } = require('../model/awsModel');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getAServiceType = async (req, res) => {
    try {
        let { cloudPlatform, serviceType } = req.params;
        serviceType = capitalizeFirstLetter(serviceType);
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
};

module.exports = getAServiceType;
