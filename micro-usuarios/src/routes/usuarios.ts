import { Router, Request, Response } from 'express';
import pool from '../config/db';
import crypto from 'crypto';

const router = Router();

// POST http://localhost:3000/api/usuarios/comenzar
router.post('/comenzar', async (req: Request, res: Response): Promise<void> => {
    let { id } = req.body;

    if (!id) {
        id = crypto.randomUUID();
        const idEnmascarado = `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
        console.log('Generado nuevo UUID:', idEnmascarado);
    }

    try {
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (usuarioExistente.rows.length > 0) {
            res.status(200).json({
                mensaje: 'Usuario existente verificado con éxito.',
                usuario: usuarioExistente.rows[0]
            });
            return;
        }
        const idEnmascarado = `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
        console.log('Creado nuevo usuario: ' + idEnmascarado);
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (id, nombre_usuario) VALUES ($1, $2) RETURNING *',
            [id, 'Invitado']
        );

        await pool.query(
            'INSERT INTO progreso_estadisticas (usuario_id) VALUES ($1)',
            [id]
        );

        res.status(201).json({
            mensaje: 'Nuevo usuario invitado creado con éxito.',
            usuario: nuevoUsuario.rows[0]
        });

    } catch (error: any) {
        console.error('Error en /comenzar:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al procesar el usuario.' });
    }
});

export default router;