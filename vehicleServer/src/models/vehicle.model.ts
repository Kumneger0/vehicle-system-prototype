import mongoose, { Schema } from 'mongoose';
import { IVehicle } from '../types/types';

const vehicleSchema = new Schema<IVehicle>({
    name: { type: String, required: true },
    status: { type: String, required: true },
    lastUpdated: { type: Date, required: true },
});

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
