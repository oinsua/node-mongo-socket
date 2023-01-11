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

        if(roles){ //If exist rol variable, then add
            const res_roles = await RolModel.find({name: {$in: roles}}) //find roles that is equal
            user.rol = res_roles.map(rol => rol._id); //the array is traversed to get only the id 
        }
        else{
            const rol = await RolModel.findOne({name: "user"}); //find only the rol for default
            user.rol = [rol._id];
        }

        //insert user into mongodb 
        const userInsert = await user.save(); 

        //Create jwt for the user
        const token = jwt.sign({id: userInsert._id}, SECRET, {expiresIn: 86400});//24 horas

        res.json(token); //send the jwt
    } catch (error) {
        res.status(500).json({ message: `"Error at Json Data" ${error}`})
    }
};