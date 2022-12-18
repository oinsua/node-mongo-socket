import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import cors from 'cors';
import routes from './src/route/userRoute.js';

const app = express();

//setting
app.set('PORT', process.env.PORT || PORT);
app.set('AppName', 'Aplication Express-Mongo-Socket');

//get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json())
app.use(express.text())
app.use(morgan('dev'))
app.use(cors({ origin: '*'}))

//route
app.get('/', (req, res) => {
    console.log(`Welcome to ${app.get('AppName')}`)
    res.status(200).send(`Welcome to ${app.get('AppName')}....`);
})

app.use(routes)

//middleware
app.use(express.static(path.join(__dirname, 'public')));

export default app;