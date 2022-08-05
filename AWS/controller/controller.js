const awsModel = require('../model/awsModel');

const awsServices = async (req, res) => {
    try {
        const cloudPlatform = req.params.cloudplatform;
        console.log(cloudPlatform);

        if (cloudPlatform === 'aws') {
            let result = await awsModel
                .find({
                    'Cloud Platform': 'AWS',
                })
                .select({ 'Cloud Platform': 0, _id: 0 });

            result = result.map((cloud) => {
                cloud.Services.map((res) => {
                    delete res.Resources;
                    return res;
                });
                return cloud;
            });
            return res.status(200).json({
                nbHits: result.length,
                result,
            });
        }
        res.status(200).json({});
    } catch (error) {}
};

module.exports = awsServices;
