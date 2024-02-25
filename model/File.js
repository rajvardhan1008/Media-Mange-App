
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

//post middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC", doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
        });

        //sent mail
        let info = await transporter.sendMail({
            from:`Rajvardhan`,
            to: doc.email,
            subject:"New File Uploaded on Cloudinary",
            html : `<h2>Hello beta jee</h2> <p>File Upload ho gayi hai sahab View Here : <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        })
        console.log(info);

    } 
    catch(error){
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;