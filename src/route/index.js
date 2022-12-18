import { Router }  from 'express';
import UserRoutes from './userRoute.js';

const routes = Router();

routes.use('/user', UserRoutes);

export default routes;