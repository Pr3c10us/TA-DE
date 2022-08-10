const { awsService } = require('../../model/awsModel');

const getAllData = async (req, res) => {
    try {
        const allData = await awsService.find({});
        res.status(200).json({
            nbHits: allData.length,
            allData,
        });
    } catch (error) {
        res.status(500).send(
            'Some internal issues, no vex'
        );
        console.log(error);
    }
};

module.exports = getAllData;
