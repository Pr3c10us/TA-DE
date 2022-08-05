const mongoose = require("mongoose");

const connectdB = (URI) => {
    return mongoose.connect(URI)
}

module.exports = connectdB