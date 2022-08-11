const { awsService } = require('../../model/awsModel');

// get all service types
const getAllServiceTypes = async (req, res) => {
    try {
        let { cloudPlatform } = req.params;
        let cp = cloudPlatform.toUpperCase();

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
        res.status(500).json({
            msg: 'Some Internal issues, no vex',
        });

        console.log(error);
    }
};

// create a new service type
const createServiceType = async (req, res) => {
    try {
        let newServiceType = req.body;

        let { cloudPlatform } = req.params;
        let cp = cloudPlatform.toUpperCase();

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
        res.status(500).json({
            msg: 'Some Internal issues, no vex',
        });
        console.log(error);
    }
};

const deleteAServiceType = async (req, res) => {
    try {
        let id = req.body.id;

        let idData = await awsService.findOne({
            _id: id,
        });

        await awsService.findOneAndDelete({
            _id: id,
        });

        res.status(202).json({
            msg: `We have successfully deleted the Service Type of id '${id}'`,
            'Data of Service Type': idData,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Some Internal issues, no vex',
        });

        console.log(error);
    }
};

const editAServiceType = async (req, res) => {
    try {
        let id = req.body.id;
        let filter = { _id: id };

        update = {
            ServiceType: req.body.ServiceType,
            CloudPlatform:
                req.body.CloudPlatform.toUpperCase(),
        };
        if (
            update.CloudPlatform !== 'AWS' &&
            update.CloudPlatform !== 'GCP' &&
            update.CloudPlatform !== 'AZURE'
        ) {
            return res.status(404).json({
                msg: `You provided a cloud Platform we don't support`,
            });
        }

        let updatedServiceType =
            await awsService.findOneAndUpdate(
                filter,
                update,
                {
                    new: true,
                    runValidators: true,
                }
            );
        if (!updatedServiceType) {
            return res.status(404).json({
                msg: `ID '${id}' Doesn't Exist`,
            });
        }

        res.status(202).json({
            msg: `Service Type with id '${id}' has been updated`,
            'Updated Data': updatedServiceType,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Some Internal issues, no vex',
        });

        console.log(error);
    }
};

module.exports = {
    getAllServiceTypes,
    createServiceType,
    deleteAServiceType,
    editAServiceType,
};
