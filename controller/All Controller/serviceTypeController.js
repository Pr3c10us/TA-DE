const { awsService } = require('../../model/awsModel');

const getAllData = async (req, res) => {
    try {
        const allData = await awsService
            .find({})
            .sort('Cloudplatform');
        res.status(200).json({
            nbHits: allData.length,
            allData,
        });
    } catch (error) {
        res.status(500).send(
            'Some internal issues, no vex'
        );
        console.log(error);
    }
};
const checkCloudPlatform = (cp) => {
    if (cp != 'AWS' && cp != 'AZURE' && cp != 'GCP') {
        return res
            .status(404)
            .send(
                `e do not provide services for such platform😩`
            );
    }
};
const getAllServiceTypes = async (req, res) => {
    try {
        let { cloudPlatform } = req.params;
        let cp = cloudPlatform.toUpperCase();
        checkCloudPlatform(cp);
        let serviceTypes = await awsService
            .find({
                CloudPlatform: cp,
            })
            .sort('ServiceType')
            .select(
                '-CloudPlatform -_id -__v -Services.ShortName -Services.Resources'
            );

        res.status(200).json({
            'Cloud Platform': cloudPlatform,
            'Service Types': serviceTypes,
        });
    } catch (error) {
        res.status(500).send(
            'Some internal issues, no vex'
        );
        console.log(error);
    }
};

const createServiceType = async (req, res) => {
    try {
        let newServiceType = req.body;
        let { cloudPlatform } = req.params;
        let cp = cloudPlatform.toUpperCase();
        checkCloudPlatform(cp);
        if (!newServiceType.ServiceType) {
            return res.status(406).json({
                msg: 'ServiceType must be provided',
            });
        }
        if (newServiceType.Services) {
            return res.status(406).json({
                msg: 'Do not provide Services',
            });
        }
        let newST = {
            CloudPlatform: cp,
            ServiceType: newServiceType.ServiceType,
            Services: newServiceType.Services,
        };
        await awsService.create(newST);
        res.status(200).json({
            msg: 'Created',
            'new data created': newST,
        });
    } catch (error) {
        res.status(500).send(
            'Some internal issues, no vex'
        );
        console.log(error);
    }
};

module.exports = {
    getAllData,
    getAllServiceTypes,
    createServiceType,
};
