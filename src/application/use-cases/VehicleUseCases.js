import { Vehicle } from '../../domain/entities/Vehicle.js';
import { NotFoundError, ConflictError } from '../../domain/errors/DomainError.js';

export class VehicleUseCases {
  constructor(repository) {
    this.repository = repository;
  }

  async create(input) {
    const vehicle = new Vehicle(input);
    if (await this.repository.findByPlate(vehicle.placa_veiculo)) {
      throw new ConflictError(`A vehicle with plate ${vehicle.placa_veiculo} already exists`);
    }
    return this.repository.create(vehicle);
  }

  list() { return this.repository.findAll(); }

  async findById(id) {
    const vehicle = await this.repository.findById(Vehicle.validateId(id));
    if (!vehicle) throw new NotFoundError();
    return vehicle;
  }

  findByModel(model) {
    return this.repository.findByModel(Vehicle.validateModelSearch(model));
  }

  async update(id, input) {
    const vehicleId = Vehicle.validateId(id);
    const vehicle = new Vehicle(input);
    await this.findById(vehicleId);
    const duplicate = await this.repository.findByPlate(vehicle.placa_veiculo);
    if (duplicate && duplicate.id !== vehicleId) {
      throw new ConflictError(`A vehicle with plate ${vehicle.placa_veiculo} already exists`);
    }
    return this.repository.update(vehicleId, vehicle);
  }

  async delete(id, permanently = false) {
    const vehicleId = Vehicle.validateId(id);
    const removed = permanently
      ? await this.repository.deletePermanently(vehicleId)
      : await this.repository.deleteSoftly(vehicleId);
    if (!removed) throw new NotFoundError();
    return { id: vehicleId, deletion: permanently ? 'permanent' : 'soft' };
  }
}

