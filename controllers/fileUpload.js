
const File = require("../model/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;
        console.log("Fle Agayi jee", file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path", path);

        file.mv(path, (err)=> {
            console.log(err);
        });

        res.json({
            success:true,
            message:'Local file uploaded Succefully',
        });

    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// handler of image upload 
exports.imageUpload = async (req,res) => {
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //velidation
        const supportedTypes = ["jpg", "jpeg", "png"];

        //fetch file type
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //if file type supported
        const response = await uploadFileToCloudinary(file, "rajvardhan");
        console.log(response);

        //create entry in DB
        const fileData = File.create({
            name,
            tags,
            email,
            //secure url uploaded image ka url hai cloudinary par
            videoUrl: response.secure_url,
        })

        res.json({
            success:true,
            videoUrl : response.secure_url,
            message:'Image Successfully Uploaded',  
            })

    } catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


//video upload handler
exports.videoUpload = async (req,res) => {
    try{
        const {name,tags,email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];

        //fetch file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //if file type supported
        const response = await uploadFileToCloudinary(file, "rajvardhan");
        console.log(response);

        //create entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            //secure url uploaded image ka url hai cloudinary par
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:'video Successfully Uploaded',  
            })

    } catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

exports.imageSizeReducer = async (req,res) => {
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //velidation
        const supportedTypes = ["jpg", "jpeg", "png"];

        //fetch file type
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //if file type supported
        const response = await uploadFileToCloudinary(file, "rajvardhan", 30);
        console.log(response);

        //create entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            //secure url uploaded image ka url hai cloudinary par
            videoUrl: response.secure_url,
        })

        res.json({
            success:true,
            videoUrl : response.secure_url,
            message:'Image Successfully Uploaded',  
            })


    } catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}