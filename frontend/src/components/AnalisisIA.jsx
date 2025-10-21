import React, { useState } from 'react';

const AnalisisIA = ({ onAnalizar, loading, proyectos = [] }) => {
  const [resultado, setResultado] = useState(null);

  const handleAnalizarProyectos = async () => {
    try {
      const response = await onAnalizar(proyectos);
      setResultado(response);
    } catch (error) {
      console.error('Error en análisis:', error);
      setResultado({ 
        error: `Error al procesar el análisis: ${error.message || 'Error desconocido'}` 
      });
    }
  };

  const handleClear = () => {
    setResultado(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis Inteligente de Proyectos</h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🤖 Análisis Automático</h3>
          <p className="text-blue-800 text-sm">
            La IA analizará automáticamente tus proyectos para identificar patrones, 
            riesgos, proyectos atrasados y recomendaciones de mejora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{proyectos.length}</div>
            <div className="text-sm text-gray-600">Proyectos Totales</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {proyectos.filter(p => p.estado === 'completado').length}
            </div>
            <div className="text-sm text-gray-600">Completados</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {proyectos.filter(p => p.estado === 'en_progreso' || p.estado === 'Activo').length}
            </div>
            <div className="text-sm text-gray-600">En Progreso</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            {proyectos.length > 0 ? `${proyectos.length} proyectos disponibles para análisis` : 'No hay proyectos para analizar'}
          </div>
          <div className="space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={handleAnalizarProyectos}
              disabled={loading || proyectos.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading ? 'Analizando...' : 'Analizar Proyectos'}
            </button>
          </div>
        </div>
      </div>

      {resultado && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resultado del Análisis</h3>
          {resultado.error ? (
            <div className="text-red-600">
              <p className="font-medium">Error:</p>
              <p>{resultado.error}</p>
            </div>
          ) : (
            <div className="text-gray-700 space-y-4">
              <div>
                <p className="font-medium mb-2">📊 Resumen del Análisis:</p>
                <p className="whitespace-pre-wrap bg-white p-3 rounded border">{resultado.resumen}</p>
              </div>
              
              {resultado.estadisticas && (
                <div>
                  <p className="font-medium mb-2">📈 Estadísticas de Proyectos:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-3 rounded border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{resultado.estadisticas.total}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{resultado.estadisticas.completados}</div>
                      <div className="text-sm text-gray-600">Completados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{resultado.estadisticas.en_progreso}</div>
                      <div className="text-sm text-gray-600">En Progreso</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{resultado.estadisticas.atrasados}</div>
                      <div className="text-sm text-gray-600">Atrasados</div>
                    </div>
                  </div>
                </div>
              )}
              
              {resultado.riesgos && resultado.riesgos.length > 0 && (
                <div>
                  <p className="font-medium mb-2">⚠️ Riesgos Identificados:</p>
                  <div className="bg-white p-3 rounded border">
                    <ul className="space-y-1">
                      {resultado.riesgos.map((riesgo, index) => (
                        <li key={index} className="text-sm text-gray-600">• {riesgo}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {resultado.recomendaciones && resultado.recomendaciones.length > 0 && (
                <div>
                  <p className="font-medium mb-2">💡 Recomendaciones:</p>
                  <div className="bg-white p-3 rounded border">
                    <ul className="space-y-1">
                      {resultado.recomendaciones.map((recomendacion, index) => (
                        <li key={index} className="text-sm text-gray-600">• {recomendacion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {resultado.timestamp && (
                <div className="text-xs text-gray-500">
                  Análisis realizado el: {new Date(resultado.timestamp).toLocaleString('es-ES')}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Nota:</strong> Esta funcionalidad utiliza inteligencia artificial para analizar automáticamente tus proyectos y generar insights valiosos sobre el estado y rendimiento de tu portafolio.</p>
      </div>
    </div>
  );
};

export default AnalisisIA;

