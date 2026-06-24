import { Router, Request, Response } from 'express';
import pool from '../config/db';

const router = Router();

// POST http://localhost:3000/api/usuarios/comenzar
router.post('/comenzar', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ error: 'El ID (UUID) del usuario es obligatorio.' });
        return;
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
        console.log('Creado nuevo usuario: ' + id);
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