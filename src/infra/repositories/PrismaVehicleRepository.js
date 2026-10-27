import prisma from '../database/prisma.js';
import { Vehicle } from '../../domain/entities/Vehicle.js';

function map(record) {
  return record ? new Vehicle(record) : null;
}

export class PrismaVehicleRepository {
  async create(vehicle) {
    return map(await prisma.veiculo.create({ data: { placa_veiculo: vehicle.placa_veiculo, modelo_veiculo: vehicle.modelo_veiculo, preco_veiculo: vehicle.preco_veiculo } }));
  }

  async findAll() {
    const rows = await prisma.veiculo.findMany({ where: { deleted_at: null }, orderBy: { id: 'asc' } });
    return rows.map(map);
  }

  async findById(id) { return map(await prisma.veiculo.findFirst({ where: { id, deleted_at: null } })); }

  async findByPlate(placa_veiculo) { return map(await prisma.veiculo.findUnique({ where: { placa_veiculo } })); }

  async findByModel(modelo_veiculo) {
    const rows = await prisma.veiculo.findMany({ where: { modelo_veiculo: { contains: modelo_veiculo }, deleted_at: null }, orderBy: { id: 'asc' } });
    return rows.map(map);
  }

  async update(id, vehicle) {
    return map(await prisma.veiculo.update({ where: { id }, data: { placa_veiculo: vehicle.placa_veiculo, modelo_veiculo: vehicle.modelo_veiculo, preco_veiculo: vehicle.preco_veiculo } }));
  }

  async deleteSoftly(id) {
    const result = await prisma.veiculo.updateMany({ where: { id, deleted_at: null }, data: { deleted_at: new Date() } });
    return result.count > 0;
  }

  async deletePermanently(id) {
    const result = await prisma.veiculo.deleteMany({ where: { id } });
    return result.count > 0;
  }
}

