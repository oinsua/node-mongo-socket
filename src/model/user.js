import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Se define una funcion para encriptar el password
UserSchema.statics.encryptPassword = async (password) => {
    const res = await bcrypt.genSalt(10); //Se especifica cuantas veces se aplica el algoritmo bcrypt
    return await bcrypt.hash(password, res); //Se le aplica el hash con el res y se devuelve el password encriptado
}

//Se define una funcion para comparar los dos password
UserSchema.statics.comparePassword = async (password, newpassword) => {
    return await bcrypt.compare(password, newpassword);
}

export default  model('UserModel', UserSchema);
