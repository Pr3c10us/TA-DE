const express = require('express');
const app = express();
const connectdb = require('./Database/connectDb');
require('dotenv').config();
const port = process.env.PORT || 8000;
const awsRouter = require('./router/awsRouter')

// MiddleWre
app.use(express.json());

app.use('/api/v1/', awsRouter)
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
