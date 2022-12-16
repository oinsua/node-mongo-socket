import mongoose, { connect }  from "mongoose";
import { MONGODB_URI } from "./config.js";

export const db_connect = async () => {
    try {
        await connect(MONGODB_URI, () => {
            console.log('Successfull MongoDb connect...')
        })
    } catch (error) {
        console.log(error);
    }
};

process.on('uncaughtException', () => {
    mongoose.connection.disconnect()
})