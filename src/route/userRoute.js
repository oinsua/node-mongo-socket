import { Router } from 'express';
import { getUser } from '../controller/userController.js';


const routes = Router();

routes.get('/', getUser);

export default routes;