import express from 'express';
import { asyncHandler } from '../../presentation/http/asyncHandler.js';

export function createRoutes(controller) {
  const router = express.Router();
  router.post('/veiculos', asyncHandler(controller.create));
  router.get('/veiculos', asyncHandler(controller.list));
  router.get('/veiculos/busca', asyncHandler(controller.findByModel));
  router.get('/veiculos/:id', asyncHandler(controller.findById));
  router.put('/veiculos/:id', asyncHandler(controller.update));
  router.delete('/veiculos/:id', asyncHandler(controller.delete));
  return router;
}
