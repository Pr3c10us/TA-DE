const mongoose = require('mongoose');
require('dotenv').config();
const connectdb = require('../Database/connectDb');
const awsoptons = require('./awsResources.json');
const awsModel = require('./model/awsModel');

const letsConnect = async () => {
  try {
    // await connectdb(process.env.MONGO_URI);
    // // console.log(awsoptons);
    // await awsModel.deleteMany();
    // await awsModel.create(awsoptons);
    // console.log('connected and updated');
    // // process.exit(1)

    let resources = awsoptons.map((service) => {
      return service.Resources
    })
    console.log(resources)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
letsConnect();
