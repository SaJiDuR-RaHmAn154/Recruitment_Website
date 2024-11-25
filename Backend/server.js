import app from "./app.js";
import cloudinary from "cloudinary"; //For storing resume

cloudinary.v2.config({
    cloud_name: process.env.Cloudinary_Client_Name,
    api_key: process.env.Cloudinary_Client_API,
    api_secret: process.env.Cloudinary_Client_SECRET
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});