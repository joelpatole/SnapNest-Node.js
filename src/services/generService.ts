import mongoose from 'mongoose';
import Gener, { IGener } from '../models/Genre';
import { CustomError } from '../utils/customError';

// Get a Gener by ID
export const getGenerById = async (id: string): Promise<IGener | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError('Invalid Gener ID', 400, [
            { param: 'id', msg: 'The provided ID is not a valid ObjectId' }
        ]);
    }
    const generDetails = await Gener.findById(id);
    return generDetails;
};

// Create a new Gener
export const createGenerServiceMethod = async (data: { name: string; displayName: string }): Promise<IGener> => {
    const newGener = new Gener(data);
    return await newGener.save();
};

// Update a Gener by ID
export const updateGenerById = async (id: string, data: { name?: string; displayName?: string }): Promise<IGener | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError('Invalid Gener ID', 400, [
            { param: 'id', msg: 'The provided ID is not a valid ObjectId' }
        ]);
    }
    const updatedGener = await Gener.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return updatedGener;
};

// Delete a Gener by ID
export const deleteGenerById = async (id: string): Promise<IGener | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError('Invalid Gener ID', 400, [
            { param: 'id', msg: 'The provided ID is not a valid ObjectId' }
        ]);
    }
    const deletedGener = await Gener.findByIdAndDelete(id);
    return deletedGener;
};

// Get all Generes
export const getGeners = async (): Promise<IGener[]> => {
    const generList = await Gener.find({});
    return generList;
};


export const createAllGeneresService = async (genresArray: Array<{ name: string; displayName: string }>): Promise<IGener[]> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const generDocs = genresArray.map(genre => new Gener(genre));
        const createdGeneres = await Gener.insertMany(generDocs, { session });

        await session.commitTransaction();
        session.endSession();

        return createdGeneres;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new CustomError('Error Creating Batch Gener', 400, [
            { param: 'id', msg: `${error}` }
        ]);
    }
};