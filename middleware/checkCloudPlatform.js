const checkCloudPlatform = (req, res, next) => {
    let { cloudPlatform } = req.params;
    let cp = cloudPlatform.toUpperCase();

    // console.log(cp);

    if (cp != 'AWS' && cp != 'AZURE' && cp != 'GCP') {
        return res.status(404).json({
            msg: 'we do not provide services for such platform😩',
        });
    }
    
    next();
};

module.exports = checkCloudPlatform;
