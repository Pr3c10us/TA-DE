const mongoose = require('mongoose');
require('dotenv').config();
const connectdb = require('../Database/connectDb');
const aws = require('./data/aws.json');
const awsRes = require('./data/awsResources.json');
const {
    awsResources,
    awsService,
} = require('./model/awsModel');

const letsConnect = async () => {
    try {
        await connectdb(process.env.MONGO_URI);
        // console.log(awsoptons);
        await awsService.deleteMany();
        await awsService.create(aws);
        await awsResources.deleteMany();
        await awsResources.create(awsRes);
        console.log('connected and updated');
        // process.exit(1)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
letsConnect();
