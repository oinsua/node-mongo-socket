import { Router } from 'express';
import { factsRules } from '../controller/ruleController.js';

const routes = Router();

routes.post('/', factsRules);

export default routes;