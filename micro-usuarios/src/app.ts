import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db';
import usuariosRoutes from './routes/usuarios';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ruta usuario
app.use('/api/usuarios', usuariosRoutes);

//prueba si funciona
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'micro-usuarios' });
});

app.listen(PORT, () => {
    console.log(`micro-usuarios corriendo en http://localhost:${PORT}`);
});