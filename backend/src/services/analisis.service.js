const prisma = require('../config/db');

/**
 * Obtener datos agregados para gráficos
 */
const getDatosGraficos = async () => {
  try {
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
    
    return result;
  } catch (error) {
    console.error('Error en getDatosGraficos:', error);
    throw error;
  }
};

/**
 * Análisis inteligente de proyectos con IA generativa
 */
const analizarProyectos = async (proyectos) => {
  try {
    if (!proyectos || !Array.isArray(proyectos) || proyectos.length === 0) {
      throw new Error('Se requieren proyectos para analizar');
    }

    // Estadísticas básicas
    const total = proyectos.length;
    const completados = proyectos.filter(p => p.estado === 'completado').length;
    const enProgreso = proyectos.filter(p => p.estado === 'en_progreso').length;
    const pendientes = proyectos.filter(p => p.estado === 'pendiente').length;
    const cancelados = proyectos.filter(p => p.estado === 'cancelado').length;

    const hoy = new Date();
    const atrasados = proyectos.filter(p => {
      if (!p.fechaFin) return false;
      const fechaFin = new Date(p.fechaFin);
      return fechaFin < hoy && p.estado !== 'completado' && p.estado !== 'cancelado';
    }).length;

    const sinFechaFin = proyectos.filter(p => !p.fechaFin && p.estado !== 'completado' && p.estado !== 'cancelado').length;

    // Preparar datos para análisis con IA
    const proyectosParaAnalizar = proyectos.map(p => ({
      nombre: p.nombre,
      descripcion: p.descripcion || 'Sin descripción',
      estado: p.estado,
      fechaInicio: p.fechaInicio,
      fechaFin: p.fechaFin
    }));

    let resumenIA = '';
    let riesgos = [];
    let recomendaciones = [];

    try {
      // Intentar usar ChatGPT si hay API key configurada
      if (process.env.OPENAI_API_KEY) {
        const openai = require('../config/openai');
        
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Eres un experto en gestión de proyectos. Analiza los proyectos proporcionados y genera insights valiosos sobre su estado, riesgos y recomendaciones. Responde SIEMPRE en formato JSON válido sin caracteres adicionales."
            },
            {
              role: "user",
              content: `Analiza estos proyectos y genera un resumen inteligente basado en sus descripciones y estados:

${proyectosParaAnalizar.map(p => `- ${p.nombre}: ${p.descripcion} (Estado: ${p.estado})`).join('\n')}

Estadísticas:
- Total: ${total} proyectos
- Completados: ${completados} (${((completados/total)*100).toFixed(1)}%)
- En progreso: ${enProgreso} (${((enProgreso/total)*100).toFixed(1)}%)
- Pendientes: ${pendientes} (${((pendientes/total)*100).toFixed(1)}%)
- Cancelados: ${cancelados} (${((cancelados/total)*100).toFixed(1)}%)
- Atrasados: ${atrasados}
- Sin fecha fin: ${sinFechaFin}

Responde en formato JSON:
{
  "resumen": "Análisis detallado de los proyectos basado en sus descripciones y patrones identificados",
  "riesgos": ["Riesgos específicos identificados"],
  "recomendaciones": ["Recomendaciones basadas en el análisis de contenido"]
}`
            }
          ],
          max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
          temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7
        });

        let respuestaIA;
        try {
          const content = completion.choices[0].message.content.trim();
          // Limpiar posibles caracteres markdown
          const cleanContent = content.replace(/```json\n?|\n?```/g, '');
          respuestaIA = JSON.parse(cleanContent);
        } catch (parseError) {
          console.log('Error parsing JSON, usando respuesta como texto:', parseError.message);
          // Si falla el parsing, usar la respuesta como texto plano
          respuestaIA = {
            resumen: completion.choices[0].message.content,
            riesgos: [],
            recomendaciones: []
          };
        }
        
        resumenIA = respuestaIA.resumen || '';
        riesgos = respuestaIA.riesgos || [];
        recomendaciones = respuestaIA.recomendaciones || [];
      } else {
        throw new Error('API key no configurada');
      }
    } catch (iaError) {
      console.log('Usando análisis local (API key no configurada):', iaError.message);
      
      // Análisis local como fallback
      resumenIA = `Análisis de ${total} proyectos:\n\n`;
      resumenIA += `• ${completados} completados (${((completados/total)*100).toFixed(1)}%)\n`;
      resumenIA += `• ${enProgreso} en progreso (${((enProgreso/total)*100).toFixed(1)}%)\n`;
      resumenIA += `• ${pendientes} pendientes (${((pendientes/total)*100).toFixed(1)}%)\n`;
      resumenIA += `• ${cancelados} cancelados (${((cancelados/total)*100).toFixed(1)}%)\n\n`;
      
      if (atrasados > 0) {
        resumenIA += `⚠️ ${atrasados} proyectos están atrasados\n`;
      }
      if (sinFechaFin > 0) {
        resumenIA += `📅 ${sinFechaFin} proyectos no tienen fecha de fin definida\n`;
      }

      // Riesgos locales
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

      // Recomendaciones locales
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
    }

    const analisis = {
      resumen: resumenIA,
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
      timestamp: new Date().toISOString(),
      fuente_ia: process.env.OPENAI_API_KEY ? 'ChatGPT' : 'Análisis local'
    };

    return analisis;
  } catch (error) {
    console.error('Error en analizarProyectos:', error);
    throw error;
  }
};

module.exports = {
  getDatosGraficos,
  analizarProyectos
};
