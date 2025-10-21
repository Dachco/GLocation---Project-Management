import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graficos = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay datos para mostrar
      </div>
    );
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    console.error('Datos de gráficos inválidos:', data);
    return (
      <div className="text-center py-8 text-red-500">
        Error: Formato de datos inválido
      </div>
    );
  }

  const chartData = Object.entries(data).map(([estado, count]) => {
    const validCount = typeof count === 'number' ? count : 0;
    
    return {
      estado: estado.charAt(0).toUpperCase() + estado.slice(1).replace('_', ' '),
      count: validCount,
      originalEstado: estado
    };
  });

  if (!Array.isArray(chartData)) {
    console.error('chartData no es un array:', chartData);
    return (
      <div className="text-center py-8 text-red-500">
        Error: No se pudieron procesar los datos
      </div>
    );
  }

  const COLORS = {
    'pendiente': '#FCD34D',
    'en_progreso': '#3B82F6',
    'completado': '#10B981',
    'cancelado': '#EF4444',
    'Activo': '#10B981'
  };

  const getColor = (estado) => {
    return COLORS[estado] || '#6B7280';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Análisis de Proyectos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Proyectos por Estado (Barras)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="estado" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pie */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Proyectos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ estado, count, percent }) => `${estado}: ${count} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => {
                  const validOriginalEstado = entry && typeof entry.originalEstado === 'string' ? entry.originalEstado : 'desconocido';
                  return (
                    <Cell key={`cell-${index}`} fill={getColor(validOriginalEstado)} />
                  );
                })}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumen de datos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {chartData.map(({ estado, count, originalEstado }) => {
            const validCount = typeof count === 'number' ? count : 0;
            const validEstado = typeof estado === 'string' ? estado : 'Desconocido';
            const validOriginalEstado = typeof originalEstado === 'string' ? originalEstado : 'desconocido';
            
            return (
              <div key={validOriginalEstado} className="text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: getColor(validOriginalEstado) }}
                ></div>
                <div className="text-2xl font-bold text-gray-900">{validCount}</div>
                <div className="text-sm text-gray-600">{validEstado}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Graficos;
