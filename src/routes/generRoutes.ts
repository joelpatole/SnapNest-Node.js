import { Router } from 'express';
import { getGener, createGener, updateGener, deleteGener, getAllGeneres, createAllGeneres } from '../controllers/generController';

const router = Router();

router.get('/gener/:id', getGener);         // Read a Gener by ID
router.post('/gener', createGener);         // Create a new Gener
router.put('/gener/:id', updateGener);      // Update a Gener by ID
router.delete('/gener/:id', deleteGener);   // Delete a Gener by ID
router.get('/gener', getAllGeneres);        // Get all Generes
router.post('/gener/batch', createAllGeneres); // Batch create Generes

export default router;
