import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { PrismaVehicleRepository } from '../repositories/PrismaVehicleRepository.js';
import { VehicleUseCases } from '../../application/use-cases/VehicleUseCases.js';
import { VehicleController } from '../../presentation/http/VehicleController.js';
import { createRoutes } from './routes.js';
import { errorHandler } from './errorHandler.js';
import { openApiDocument } from './openapi.js';

const app = express();
const repository = new PrismaVehicleRepository();
const controller = new VehicleController(new VehicleUseCases(repository));

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/docs.json', (req, res) => res.json(openApiDocument));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument, { explorer: true }));
const routes = createRoutes(controller);
app.use('/api', routes);
app.use(routes);
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

export default app;
