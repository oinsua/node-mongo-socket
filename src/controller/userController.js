import UserModel from '../model/user.js';
import RolModel from '../model/rol.js';
import jwt from 'jsonwebtoken';

//get all user from mongo atlas
export const getUser = async (req, res) => {
    try {
        const allUser = await UserModel.find();
        res.status(200).json(allUser);   
    } catch (error) {
       console.log(error); 
       res.status(500).json({ message: error });
    }
};

//create a new user in mongo atlas
export const createUser = async (req, res) => {

    try {
        const { userName, email, password, roles } = req.body;
        const bcryptPass = await UserModel.encryptPassword(password);
        const user = new UserModel({
            userName,
            email,
            password: bcryptPass 
        })

        if(roles){ //Si se la variable roles entonces se procede a incorporarla
            const res_roles = await RolModel.find({name: {$in: roles}}) //Buscar los roles que son iguales
            user.rol = res_roles.map(rol => rol._id); //Se recorre el array para obtener solo los id 
        }
        else{
            const rol = await RolModel.findOne({name: "user"}); //Voy a buscar solo el rol user por defecto
            user.rol = [rol._id];
        }

        //Insertar en la base de datos de mongodb el usuario
        const userInsert = await user.save(); 

        //Crear el jwt para el cliente
        const token = jwt.sign({id: userInsert._id}, SECRET, {expiresIn: 86400});//24 horas

        res.json(token); //Respuesta al cliente del token que se le ha asignado
    } catch (error) {
        res.status(500).json({ message: `"Error at Json Data" ${error}`})
    }
};