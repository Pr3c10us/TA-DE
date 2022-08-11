const { awsService } = require('../model/awsModel');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const checkServiceType = async (req, res, next) => {
    try {
        let { serviceType } = req.params;
        serviceType = capitalizeFirstLetter(serviceType);

        const allService = await awsService.find({});
        const allserviceType = allService.map(
            (services) => {
                return services.ServiceType;
            }
        );

        if (
            allserviceType.includes(
                `${serviceType} Service`
            ) == false
        ) {
            return res.status(404).json({
                msg: 'We no support that service type',
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Some Internal issues, no vex',
        });

        console.log(error);
    }
};

module.exports = checkServiceType;
