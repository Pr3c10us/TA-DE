const express = require('express');
const router = express.Router();

const awsModel = require('../AWS/model/awsModel');

router.route('/:cloudplatform').get(async (req, res) => {
    try {
        const cloudPlatform = req.params.cloudplatform;
        console.log(cloudPlatform);

        if (cloudPlatform === 'aws') {
            let result = await awsModel
                .find({
                    'Cloud Platform': 'AWS',
                })
                .select({ 'Cloud Platform': 0, _id : 0 });
            
            return res.status(200).json({
                nbHits: result.length,
                result,
            });
        }
        if (cloudPlatform === 'gcp') {
            const result = await awsModel.find({
                'Cloud Platform': 'GCP',
            });
            return res.status(200).json({
                nbHits: result.length,
                result,
            });
        }
        if (cloudPlatform === 'azure') {
            const result = await awsModel.find({
                'Cloud Platform': 'Azure',
            });

            return res.status(200).json({
                nbHits: result.length,
                result,
            });
        }
        res.status(200).json({});
    } catch (error) {}
});

module.exports = router;
