const analisisService = require('../services/analisis.service');

/**
 * Obtener datos para gráficos
 */
const getGraficos = async (req, res, next) => {
  try {
    const data = await analisisService.getDatosGraficos();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Análisis inteligente de proyectos
 */
const analizarProyectos = async (req, res, next) => {
  try {
    const proyectos = req.body;
    const analisis = await analisisService.analizarProyectos(proyectos);
    res.json(analisis);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGraficos,
  analizarProyectos
};
