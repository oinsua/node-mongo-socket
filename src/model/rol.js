import { Schema, model } from "mongoose";

const RolSchema = new Schema({
    rolName: {
        type: String,
        require: true,
        trim: true,
    },
    permission: [{
        ref: "Permission",
        type: Schema.Types.ObjectId
    }] 
},
{
    versionKey: false,
    timestamps: true
});


export default model('RolModel', RolSchema);