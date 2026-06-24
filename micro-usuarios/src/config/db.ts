import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a PostgreSQL:', err.message);
    } else {
        console.log('Conexión a PostgreSQL establecida con éxito');
    }
});

export default pool;