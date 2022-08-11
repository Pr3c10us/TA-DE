const express = require('express');
const app = express();
const connectdb = require('./Database/connectDb');
require('dotenv').config();
const port = process.env.PORT || 8000;

// // MiddleWre
app.use(express.json());

// check if cloud platform provided exist
const checkCloudPlatform = require('./middleware/checkCloudPlatform');
app.use('/api/v1/:cloudPlatform', checkCloudPlatform);

// check if service type provided is available
const checkServiceType = require('./middleware/checkServiceType');
app.use(
    '/api/v1/:cloudPlatform/:serviceType',
    checkServiceType
);

// router
const awsRouter = require('./router/Router');
app.use('/api/v1/', awsRouter);

// Serve
const serve = async () => {
    await connectdb(process.env.MONGO_URI);
    console.log('Connected to database');
    app.listen(port, () => {
        console.log(
            `This Api is running on http://localhost:${port}`
        );
    });
};
serve();
