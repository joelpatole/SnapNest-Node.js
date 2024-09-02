import { NextFunction, Request, Response } from 'express';
import { 
    getGenerById, 
    createGenerServiceMethod, 
    updateGenerById, 
    deleteGenerById, 
    getGeners, 
    createAllGeneresService
} from '../services/generService';

// Get a Gener by ID
export const getGener = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generId = req.params.id;
        const generDetails = await getGenerById(generId);
        if (!generDetails) {
            return res.status(404).json({ message: 'Gener not found' });
        }
        res.status(200).json(generDetails);
    } catch (error) {
        next(error);
    }
};

// Create a new Gener
export const createGener = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, displayName } = req.body;
        const newGener = await createGenerServiceMethod({ name, displayName });
        res.status(201).json(newGener);
    } catch (error) {
        next(error);
    }
};

// Update a Gener by ID
export const updateGener = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generId = req.params.id;
        const { name, displayName } = req.body;
        const updatedGener = await updateGenerById(generId, { name, displayName });
        if (!updatedGener) {
            return res.status(404).json({ message: 'Gener not found' });
        }
        res.status(200).json(updatedGener);
    } catch (error) {
        next(error);
    }
};

// Delete a Gener by ID
export const deleteGener = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generId = req.params.id;
        const deletedGener = await deleteGenerById(generId);
        if (!deletedGener) {
            return res.status(404).json({ message: 'Gener not found' });
        }
        res.status(200).json({ message: 'Gener deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Get all Generes
export const getAllGeneres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generList = await getGeners();
        res.status(200).json(generList);
    } catch (error) {
        next(error);
    }
};

// Batch Create Generes
export const createAllGeneres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genresArray = req.body; // expecting an array of gener objects
        if (!Array.isArray(genresArray) || genresArray.length === 0) {
            return res.status(400).json({ message: 'Invalid input: Expected an array of gener objects' });
        }

        const createdGeneres = await createAllGeneresService(genresArray);
        res.status(201).json(createdGeneres);
    } catch (error) {
        next(error);
    }
};
