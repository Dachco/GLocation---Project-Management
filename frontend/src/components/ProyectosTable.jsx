import React from 'react';

const ProyectosTable = ({ proyectos, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!proyectos || proyectos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay proyectos registrados
      </div>
    );
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <div className="overflow-x-auto">
      {/* Vista de escritorio */}
      <div className="hidden lg:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Fin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {proyecto.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {proyecto.descripcion || 'Sin descripción'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(proyecto.estado)}`}>
                    {proyecto.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(proyecto.fechaInicio)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(proyecto.fechaFin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(proyecto)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(proyecto.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="lg:hidden space-y-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
                {proyecto.nombre}
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(proyecto.estado)}`}>
                {proyecto.estado}
              </span>
            </div>
            
            {proyecto.descripcion && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {proyecto.descripcion}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
              <div>
                <span className="font-medium">Inicio:</span>
                <br />
                {formatDate(proyecto.fechaInicio)}
              </div>
              <div>
                <span className="font-medium">Fin:</span>
                <br />
                {formatDate(proyecto.fechaFin)}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(proyecto)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(proyecto.id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProyectosTable;
