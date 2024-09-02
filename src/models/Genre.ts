import { Schema, model } from 'mongoose';

export interface IGener extends Document {
    isModified(arg0: string): unknown;
    name: string;
    displayName: string;
}

const GenerSchema = new Schema<IGener>({
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true }
});

// Pre-save middleware to modify name and displayName
GenerSchema.pre<IGener>('save', function (next) {
    // Remove spaces and convert to lowercase for the 'name' field
    if (this.isModified('name')) {
        this.name = this.name.replace(/\s+/g, '').toLowerCase();
    }

    // Convert to lowercase for the 'displayName' field
    if (this.isModified('displayName')) {
        this.displayName = this.displayName.toLowerCase();
    }

    next();
});

export default model<IGener>('Gener', GenerSchema);