import test from 'node:test';
import assert from 'node:assert/strict';
import { VehicleUseCases } from '../src/application/use-cases/VehicleUseCases.js';

test('allows choosing soft or permanent deletion', async () => {
  const calls = [];
  const repository = {
    findByPlate: async () => null,
    deleteSoftly: async (id) => { calls.push(['soft', id]); return true; },
    deletePermanently: async (id) => { calls.push(['permanent', id]); return true; },
  };
  const useCases = new VehicleUseCases(repository);

  assert.deepEqual(await useCases.delete('1'), { id: 1, deletion: 'soft' });
  assert.deepEqual(await useCases.delete('2', true), { id: 2, deletion: 'permanent' });
  assert.deepEqual(calls, [['soft', 1], ['permanent', 2]]);
});
