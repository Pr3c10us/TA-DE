const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    'Cloud Platform': {
        type: String,
        enum: {
            values: ['AWS', 'GCP', 'Azure'],
        },
    },
    'Service Type': {
        type: String,
    },
    Services: {
        type: Array,
    },
});

const awsModel = mongoose.model('awsModel', schema);

module.exports = awsModel;
