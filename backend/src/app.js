const express = require('express');
const cors = require('cors');
const proyectosRoutes = require('./routes/proyectos.routes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Proyectos', version: '1.0.0', description: 'CRUD proyectos' }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/proyectos', proyectosRoutes);

app.get('/api/graficos', async (req, res) => {
  try {
    const prisma = require('./config/db');
    const agrupado = await prisma.proyecto.groupBy({
      by: ['estado'],
      _count: { estado: true }
    });
    
    // Convierte los datos de Prisma al formato que espera el frontend
    const result = {};
    agrupado.forEach(item => {
      if (item && typeof item.estado === 'string' && item._count && typeof item._count.estado === 'number') {
        result[item.estado] = item._count.estado;
      }
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error en /api/graficos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Análisis inteligente de proyectos con detección de riesgos y recomendaciones
app.post('/api/analisis', async (req, res) => {
  try {
    const proyectos = req.body;
    
    if (!proyectos || !Array.isArray(proyectos) || proyectos.length === 0) {
      return res.status(400).json({ error: 'Se requieren proyectos para analizar' });
    }

    const total = proyectos.length;
    const completados = proyectos.filter(p => p.estado === 'completado').length;
    const enProgreso = proyectos.filter(p => p.estado === 'en_progreso' || p.estado === 'Activo').length;
    const pendientes = proyectos.filter(p => p.estado === 'pendiente').length;
    const cancelados = proyectos.filter(p => p.estado === 'cancelado').length;

    const hoy = new Date();
    const atrasados = proyectos.filter(p => {
      if (!p.fechaFin) return false;
      const fechaFin = new Date(p.fechaFin);
      return fechaFin < hoy && p.estado !== 'completado' && p.estado !== 'cancelado';
    }).length;

    const sinFechaFin = proyectos.filter(p => !p.fechaFin && p.estado !== 'completado' && p.estado !== 'cancelado').length;
    let resumen = `Análisis de ${total} proyectos:\n\n`;
    resumen += `• ${completados} completados (${((completados/total)*100).toFixed(1)}%)\n`;
    resumen += `• ${enProgreso} en progreso (${((enProgreso/total)*100).toFixed(1)}%)\n`;
    resumen += `• ${pendientes} pendientes (${((pendientes/total)*100).toFixed(1)}%)\n`;
    resumen += `• ${cancelados} cancelados (${((cancelados/total)*100).toFixed(1)}%)\n\n`;
    
    if (atrasados > 0) {
      resumen += `⚠️ ${atrasados} proyectos están atrasados\n`;
    }
    if (sinFechaFin > 0) {
      resumen += `📅 ${sinFechaFin} proyectos no tienen fecha de fin definida\n`;
    }

    const riesgos = [];
    if (atrasados > 0) {
      riesgos.push(`${atrasados} proyectos están atrasados y requieren atención inmediata`);
    }
    if (sinFechaFin > 0) {
      riesgos.push(`${sinFechaFin} proyectos no tienen fecha de fin, lo que puede causar retrasos`);
    }
    if (enProgreso > total * 0.7) {
      riesgos.push('Más del 70% de los proyectos están en progreso, puede haber sobrecarga del equipo');
    }
    if (completados < total * 0.2) {
      riesgos.push('Menos del 20% de los proyectos están completados, revisar la eficiencia del proceso');
    }

    const recomendaciones = [];
    if (atrasados > 0) {
      recomendaciones.push('Priorizar los proyectos atrasados y reasignar recursos si es necesario');
    }
    if (sinFechaFin > 0) {
      recomendaciones.push('Definir fechas de fin para todos los proyectos pendientes');
    }
    if (enProgreso > total * 0.6) {
      recomendaciones.push('Considerar completar algunos proyectos antes de iniciar nuevos');
    }
    if (completados > total * 0.8) {
      recomendaciones.push('Excelente rendimiento! Considerar iniciar nuevos proyectos');
    }

    const analisis = {
      resumen,
      estadisticas: {
        total,
        completados,
        en_progreso: enProgreso,
        pendientes,
        cancelados,
        atrasados,
        sin_fecha_fin: sinFechaFin
      },
      riesgos,
      recomendaciones,
      timestamp: new Date().toISOString()
    };

    res.json(analisis);
  } catch (error) {
    console.error('Error en análisis IA:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
