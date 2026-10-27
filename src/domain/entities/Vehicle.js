import { ValidationError } from '../errors/DomainError.js';

export class Vehicle {
  constructor({ id, placa_veiculo, modelo_veiculo, preco_veiculo, deleted_at, created_at, updated_at }) {
    this.id = id;
    this.placa_veiculo = Vehicle.normalizePlate(placa_veiculo);
    this.modelo_veiculo = Vehicle.normalizeModel(modelo_veiculo);
    this.preco_veiculo = Vehicle.validatePrice(preco_veiculo);
    this.deleted_at = deleted_at ?? null;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static normalizePlate(plate) {
    if (typeof plate !== 'string' || !plate.trim()) throw new ValidationError('placa_veiculo is required');
    return plate.trim().toUpperCase();
  }

  static normalizeModel(model) {
    if (typeof model !== 'string' || !model.trim()) throw new ValidationError('modelo_veiculo is required');
    return model.trim();
  }

  static validatePrice(price) {
    if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
      throw new ValidationError('preco_veiculo must be a number greater than or equal to zero');
    }
    return price;
  }

  static validateId(id) {
    const number = Number(id);
    if (!Number.isInteger(number) || number <= 0) throw new ValidationError('id must be a positive integer');
    return number;
  }

  static validateModelSearch(model) {
    if (typeof model !== 'string' || !model.trim()) {
      throw new ValidationError('the "modelo" query parameter is required');
    }
    return Vehicle.normalizeModel(model);
  }

  toJSON() {
    return {
      id: this.id,
      placa_veiculo: this.placa_veiculo,
      modelo_veiculo: this.modelo_veiculo,
      preco_veiculo: this.preco_veiculo,
      deleted_at: this.deleted_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

