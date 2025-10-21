import React, { useState, useEffect } from 'react';
import ProyectosTable from '../components/ProyectosTable';
import ProyectoForm from '../components/ProyectoForm';
import { proyectosAPI } from '../services/api';

const ProyectosPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      setLoading(true);
      const response = await proyectosAPI.getAll();
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      alert('Error al cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProyecto(null);
    setShowForm(true);
  };

  const handleEdit = (proyecto) => {
    setEditingProyecto(proyecto);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      
      if (editingProyecto) {
        await proyectosAPI.update(editingProyecto.id, formData);
        alert('Proyecto actualizado exitosamente');
      } else {
        await proyectosAPI.create(formData);
        alert('Proyecto creado exitosamente');
      }
      
      setShowForm(false);
      setEditingProyecto(null);
      cargarProyectos();
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      try {
        await proyectosAPI.delete(id);
        alert('Proyecto eliminado exitosamente');
        cargarProyectos();
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProyecto(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Proyectos</h1>
        <button
          onClick={handleCreate}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          + Nuevo Proyecto
        </button>
      </div>

      {showForm ? (
        <div className="mb-8">
          <ProyectoForm
            proyecto={editingProyecto}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <ProyectosTable
            proyectos={proyectos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ProyectosPage;
