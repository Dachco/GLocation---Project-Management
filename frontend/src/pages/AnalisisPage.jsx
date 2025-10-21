import React, { useState, useEffect } from 'react';
import Graficos from '../components/Graficos';
import AnalisisIA from '../components/AnalisisIA';
import { proyectosAPI } from '../services/api';

const AnalisisPage = () => {
  const [graficosData, setGraficosData] = useState({});
  const [proyectos, setProyectos] = useState([]);
  const [graficosLoading, setGraficosLoading] = useState(true);
  const [analisisLoading, setAnalisisLoading] = useState(false);

  useEffect(() => {
    cargarDatosGraficos();
    cargarProyectos();
  }, []);

  const cargarDatosGraficos = async () => {
    try {
      setGraficosLoading(true);
      const response = await proyectosAPI.getGraficos();
      setGraficosData(response.data);
    } catch (error) {
      console.error('Error al cargar datos de gráficos:', error);
      alert('Error al cargar los datos para gráficos');
    } finally {
      setGraficosLoading(false);
    }
  };

  const cargarProyectos = async () => {
    try {
      const response = await proyectosAPI.getAll();
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const handleAnalizar = async (proyectosData) => {
    try {
      setAnalisisLoading(true);
      const response = await proyectosAPI.analizar(proyectosData);
      return response.data;
    } catch (error) {
      console.error('Error en análisis IA:', error);
      throw error;
    } finally {
      setAnalisisLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Análisis y Reportes</h1>
      
      <div className="space-y-8">
        <div>
          <Graficos data={graficosData} loading={graficosLoading} />
        </div>

        <div>
          <AnalisisIA 
            onAnalizar={handleAnalizar} 
            loading={analisisLoading} 
            proyectos={proyectos}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalisisPage;
