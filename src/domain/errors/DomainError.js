export class DomainError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends DomainError {}

export class NotFoundError extends DomainError {
  constructor(message = 'Veículo não encontrado') {
    super(message, 404);
  }
}

export class ConflictError extends DomainError {
  constructor(message) {
    super(message, 409);
  }
}

