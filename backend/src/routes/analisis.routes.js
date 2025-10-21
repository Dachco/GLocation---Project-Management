const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/analisis.controller');

/**
 * @swagger
 * tags:
 *   name: Análisis
 *   description: Análisis inteligente y datos para gráficos
 */

/**
 * @swagger
 * /api/graficos:
 *   get:
 *     summary: Obtener datos agregados para gráficos
 *     tags: [Análisis]
 *     responses:
 *       200:
 *         description: Datos agregados de proyectos por estado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 pendiente: 5
 *                 en_progreso: 3
 *                 completado: 2
 *                 cancelado: 1
 */
router.get('/graficos', ctrl.getGraficos);

/**
 * @swagger
 * /api/analisis:
 *   post:
 *     summary: Análisis inteligente de proyectos con IA
 *     tags: [Análisis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: string
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *     responses:
 *       200:
 *         description: Análisis inteligente completado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resumen:
 *                   type: string
 *                 estadisticas:
 *                   type: object
 *                 riesgos:
 *                   type: array
 *                   items:
 *                     type: string
 *                 recomendaciones:
 *                   type: array
 *                   items:
 *                     type: string
 *                 fuente_ia:
 *                   type: string
 */
router.post('/analisis', ctrl.analizarProyectos);

module.exports = router;
