const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const fileUplaod = require("express-fileupload");

app.use(fileUplaod({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/FileUpload");

app.use("/api/v1/upload", Upload);

app.listen(PORT, ()=>{
    console.log(`APP is running at ${PORT}`);
})

