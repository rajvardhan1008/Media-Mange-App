
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const CLOUD_NAME = process.env.CLOUD_NAME;

const API_KEY = process.env.API_KEY;

const API_SECRET = process.env.API_SECRET;


exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key : API_KEY,
            api_secret: process.env.API_SECRET,
        })
    } catch(error){
        console.log(error);
    }
}