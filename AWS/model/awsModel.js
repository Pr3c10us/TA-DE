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
  Service: {
    type: String,
  },
  'Service Description': {
    type: String,
  },
  Resources: {
    type: Array,
  },
});

const awsModel = mongoose.model('awsModel', schema);

module.exports = awsModel;
