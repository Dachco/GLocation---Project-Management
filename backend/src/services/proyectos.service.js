const prisma = require('../config/db');

exports.findAll = async () => {
  return prisma.proyecto.findMany();
};

exports.findById = async (id) => {
  return prisma.proyecto.findUnique({ where: { id } });
};

exports.create = async (data) => {
  const proyectoData = {
    ...data,
    fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : new Date(),
    fechaFin: data.fechaFin ? new Date(data.fechaFin) : null
  };

  return prisma.proyecto.create({ data: proyectoData });
};

exports.update = async (id, data) => {
  const proyectoData = {
    ...data,
    fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
    fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined
  };

  return prisma.proyecto.update({ where: { id }, data: proyectoData });
};

exports.remove = async (id) => {
  return prisma.proyecto.delete({ where: { id } });
};

exports.countByEstado = async () => {
  const proyectos = await prisma.proyecto.groupBy({
    by: ['estado'],
    _count: { estado: true }
  });

  const result = {};
  proyectos.forEach(p => {
    result[p.estado] = p._count.estado;
  });

  return result;
};