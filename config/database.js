const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("mongoose connnection successfully"))
    .catch((error) => {
        console.log("DB connnection issue");
        console.log(error);
        process.exit(1);
    })
}