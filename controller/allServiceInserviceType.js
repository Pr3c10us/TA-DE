const { awsService } = require('../model/awsModel');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// get all services in specified service type or get a specific service
const getAServiceType = async (req, res) => {
    try {
        let { cloudPlatform, serviceType } = req.params;
        serviceType = capitalizeFirstLetter(serviceType);
        cloudPlatform = cloudPlatform.toUpperCase();
        let { shortName } = req.query;

        if (shortName) {
            shortName = shortName.toUpperCase();

            let { cloudPlatform, serviceType } = req.params;
            serviceType =
                capitalizeFirstLetter(serviceType);
            cloudPlatform = cloudPlatform.toUpperCase();

            let service = await awsService
                .findOne({
                    ServiceType: `${serviceType} Service`,
                    CloudPlatform: cloudPlatform,
                    ['Services.ShortName']: shortName,
                })
                .select(
                    '-_id -ServiceType -CloudPlatform -__v'
                );

            if (!service) {
                return res.status(404).json({
                    msg: `${shortName} service is not available or you spelt it wrong`,
                });
            }

            service = service.Services;
            let newService = service.find((service) => {
                return service.ShortName == shortName;
            });

            return res.status(200).json({
                'Cloud Platform': cloudPlatform,
                'Service Type': `${serviceType} Service`,
                Service: newService,
            });
        }

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
