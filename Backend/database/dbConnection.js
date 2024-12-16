import mongoose from "mongoose";

// Connecting with mongoDB
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Recruitment_Website",
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(`error occured while maing connection with database:${err}`);
    });
};