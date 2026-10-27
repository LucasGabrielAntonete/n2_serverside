export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Vehicle API',
    version: '2.0.0',
    description: 'CRUD API for vehicles with model search and soft or permanent deletion.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
  tags: [{ name: 'Vehicles', description: 'Vehicle management operations' }],
  paths: {
    '/api/veiculos': {
      post: {
        tags: ['Vehicles'],
        summary: 'Create a vehicle',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VehicleInput' }, example: { placa_veiculo: 'ABC-1234', modelo_veiculo: 'Honda Civic', preco_veiculo: 95000 } } } },
        responses: {
          201: { description: 'Vehicle created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Vehicle' } } } },
          400: { $ref: '#/components/responses/BadRequest' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      get: {
        tags: ['Vehicles'],
        summary: 'List active vehicles',
        responses: { 200: { description: 'Active vehicles', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Vehicle' } } } } } },
      },
    },
    '/api/veiculos/busca': {
      get: {
        tags: ['Vehicles'],
        summary: 'Search vehicles by model',
        parameters: [{ name: 'modelo', in: 'query', required: true, description: 'Part of the vehicle model name', schema: { type: 'string', example: 'Civic' } }],
        responses: {
          200: { description: 'Matching vehicles', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Vehicle' } } } } },
          400: { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/api/veiculos/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, description: 'Vehicle identifier', schema: { type: 'integer', minimum: 1, example: 1 } }],
      get: {
        tags: ['Vehicles'], summary: 'Find a vehicle by ID',
        responses: { 200: { description: 'Vehicle found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Vehicle' } } } }, 404: { $ref: '#/components/responses/NotFound' } },
      },
      put: {
        tags: ['Vehicles'], summary: 'Update a vehicle',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VehicleInput' } } } },
        responses: { 200: { description: 'Vehicle updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Vehicle' } } } }, 400: { $ref: '#/components/responses/BadRequest' }, 404: { $ref: '#/components/responses/NotFound' }, 409: { $ref: '#/components/responses/Conflict' } },
      },
      delete: {
        tags: ['Vehicles'], summary: 'Delete a vehicle', description: 'By default, performs a soft deletion. Use definitiva=true for permanent deletion.',
        parameters: [{ name: 'definitiva', in: 'query', required: false, description: 'Set to true to permanently remove the record', schema: { type: 'boolean', default: false, example: false } }],
        responses: { 200: { description: 'Deletion completed', content: { 'application/json': { schema: { $ref: '#/components/schemas/DeletionResult' }, examples: { soft: { value: { id: 1, deletion: 'soft' } }, permanent: { value: { id: 1, deletion: 'permanent' } } } } } }, 404: { $ref: '#/components/responses/NotFound' } },
      },
    },
  },
  components: {
    schemas: {
      VehicleInput: {
        type: 'object', required: ['placa_veiculo', 'modelo_veiculo', 'preco_veiculo'],
        properties: {
          placa_veiculo: { type: 'string', minLength: 1, description: 'Vehicle plate', example: 'ABC-1234' },
          modelo_veiculo: { type: 'string', minLength: 1, description: 'Vehicle model', example: 'Honda Civic' },
          preco_veiculo: { type: 'number', format: 'float', minimum: 0, description: 'Vehicle price', example: 95000 },
        },
      },
      Vehicle: {
        allOf: [{ $ref: '#/components/schemas/VehicleInput' }, { type: 'object', properties: { id: { type: 'integer', example: 1 }, deleted_at: { type: 'string', format: 'date-time', nullable: true }, created_at: { type: 'string', format: 'date-time' }, updated_at: { type: 'string', format: 'date-time' } } }],
      },
      DeletionResult: { type: 'object', required: ['id', 'deletion'], properties: { id: { type: 'integer', example: 1 }, deletion: { type: 'string', enum: ['soft', 'permanent'], example: 'soft' } } },
      Error: { type: 'object', required: ['error'], properties: { error: { type: 'string', example: 'Vehicle not found' } } },
    },
    responses: {
      BadRequest: { description: 'Invalid request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
      NotFound: { description: 'Vehicle not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
      Conflict: { description: 'Duplicate vehicle plate', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
    },
  },
};
