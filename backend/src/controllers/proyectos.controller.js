const proyectosService = require('../services/proyectos.service');

exports.getAll = async (req, res, next) => {
  try {
    const resData = await proyectosService.findAll();
    res.json(resData);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const proyecto = await proyectosService.findById(Number(req.params.id));
    if (!proyecto) return res.status(404).json({ error: 'No encontrado' });
    res.json(proyecto);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const created = await proyectosService.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await proyectosService.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await proyectosService.remove(Number(req.params.id));
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.getGraficos = async (req, res, next) => {
  try {
    const data = await proyectosService.countByEstado();
    res.json(data);
  } catch (err) {
    next(err);
  }
};