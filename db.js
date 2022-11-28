import { connect }  from "mongoose";
import { MONGODB_URL } from "./config.js";

export const db_connect = async () => {
    try {
        await connect(MONGODB_URL, () => {
            console.log('Successfull MongoDb connect...')
        })
    } catch (error) {
        console.log(error);
    }
};