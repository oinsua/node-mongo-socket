import { Schema, model } from "mongoose";

const PermissionSchema = new Schema({
    PermissionName: {
        type: String,
        require: true,
        trim: true,
    } 
},
{
    versionKey: false,
    timestamps: true
});


module.exports = model('Permission', PermissionSchema);