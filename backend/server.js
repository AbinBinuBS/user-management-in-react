import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import databaseConnection from './utils/db.js'; 
import routers from './routes/userRoute.js';    
import cors from 'cors';
import admin_route from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

databaseConnection();

app.use(express.json());  
app.use(cors());         

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api', routers);
app.use('/admin', admin_route);


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

