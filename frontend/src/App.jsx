import React, { useState } from 'react';
import ProyectosPage from './pages/ProyectosPage';
import AnalisisPage from './pages/AnalisisPage';

function App() {
  const [currentPage, setCurrentPage] = useState('proyectos');

  const navigation = [
    { id: 'proyectos', label: 'Proyectos', icon: '📋' },
    { id: 'analisis', label: 'Análisis', icon: '📊' }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'proyectos':
        return <ProyectosPage />;
      case 'analisis':
        return <AnalisisPage />;
      default:
        return <ProyectosPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                <span className="hidden sm:inline">GLocation - Project Management</span>
                <span className="sm:hidden">GLocation</span>
              </h1>
            </div>
            <div className="hidden md:block text-sm text-gray-500">
              Sistema de Gestión de Proyectos
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 md:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-1 md:mr-2">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 GLocation - Project Management. Desarrollado con React, Node.js y PostgreSQL.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
