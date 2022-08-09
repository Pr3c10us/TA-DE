const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    CloudPlatform: {
        type: String,
        enum: {
            values: ['AWS', 'GCP', 'Azure'],
        },
    },
    ServiceType: {
        type: String,
    },
    Services: {
        type: Array,
    },
});

const schema2 = new mongoose.Schema({
    ServiceName: {
        type: String,
    },
    ShortName: {
        type: String,
        required: true,
    },
    ServiceDescription: {
        type: String,
    },
    Resources: {
        type: Array,
    },
});

const awsService = mongoose.model('awsService', schema);
const awsResources = mongoose.model(
    'awsResources',
    schema2
);

module.exports = {
    awsResources,
    awsService,
};
