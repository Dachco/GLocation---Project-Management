import axios from 'axios';

const API_BASE_URL = (() => {
  if (process.env.DOCKER === 'true') {
    return '/api';
  }
  
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4000/api';
  }
  
  return '/api';
})();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const proyectosAPI = {
  getAll: () => api.get('/proyectos'),
  getById: (id) => api.get(`/proyectos/${id}`),
  create: (proyecto) => api.post('/proyectos', proyecto),
  update: (id, proyecto) => api.put(`/proyectos/${id}`, proyecto),
  delete: (id) => api.delete(`/proyectos/${id}`),
  getGraficos: () => api.get('/graficos'),
  analizar: (proyectos) => api.post('/analisis', proyectos),
};

export default api;
