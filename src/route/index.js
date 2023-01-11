import { Router } from 'express';
import UserRoutes from './userRoute.js';
import FactRules from './factRoutes.js';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/rules', FactRules);

export default routes;