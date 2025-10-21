const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/proyectos.controller');

/**
 * @swagger
 * tags:
 *   name: Proyectos
 *   description: Gestión completa de proyectos
 */

/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Proyecto Web"
 *                   descripcion:
 *                     type: string
 *                     example: "Desarrollo de aplicación web"
 *                   estado:
 *                     type: string
 *                     example: "en_progreso"
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-01"
 *                   fechaFin:
 *                     type: string
 *                     format: date
 *                     example: "2024-12-31"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Proyecto Web"
 *                 description: "Nombre del proyecto"
 *               descripcion:
 *                 type: string
 *                 example: "Desarrollo de aplicación web"
 *                 description: "Descripción del proyecto"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completado, cancelado]
 *                 default: pendiente
 *                 example: "en_progreso"
 *                 description: "Estado del proyecto"
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *                 description: "Fecha de inicio del proyecto"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *                 description: "Fecha de fin del proyecto"
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Proyecto Web"
 *                 descripcion:
 *                   type: string
 *                   example: "Desarrollo de aplicación web"
 *                 estado:
 *                   type: string
 *                   example: "en_progreso"
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-01"
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: "ID único del proyecto"
 *     responses:
 *       200:
 *         description: Proyecto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Proyecto Web"
 *                 descripcion:
 *                   type: string
 *                   example: "Desarrollo de aplicación web"
 *                 estado:
 *                   type: string
 *                   example: "en_progreso"
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-01"
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No encontrado"
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: "ID único del proyecto a actualizar"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Proyecto Web Actualizado"
 *                 description: "Nombre del proyecto"
 *               descripcion:
 *                 type: string
 *                 example: "Desarrollo de aplicación web mejorada"
 *                 description: "Descripción del proyecto"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_progreso, completado, cancelado]
 *                 example: "completado"
 *                 description: "Estado del proyecto"
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *                 description: "Fecha de inicio del proyecto"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *                 description: "Fecha de fin del proyecto"
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Proyecto Web Actualizado"
 *                 descripcion:
 *                   type: string
 *                   example: "Desarrollo de aplicación web mejorada"
 *                 estado:
 *                   type: string
 *                   example: "completado"
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-01"
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No encontrado"
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: "ID único del proyecto a eliminar"
 *     responses:
 *       204:
 *         description: Proyecto eliminado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No encontrado"
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', ctrl.remove);


module.exports = router;
