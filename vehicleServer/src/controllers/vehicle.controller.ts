import { Request, Response } from 'express';
import { IVehicle } from '../types/types';
import Vehicle from '../models/vehicle.model';

export const addVehicle = async (req: Request, res: Response) => {
    try {
        const { name, status, lastUpdated } = req.body as IVehicle;
        const newVehicle = new Vehicle({ name, status, lastUpdated });
        await newVehicle.save();
        res.status(201).json({ success: true, message: 'Vehicle added successfully' });
    } catch (error) {
        console.error('🛑 Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        console.error('🛑 Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


export const updateVehicleStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        vehicle.status = status;
        await vehicle.save();
        res.status(200).json({ success: true, message: 'Vehicle status updated successfully' });
    } catch (error) {
        console.error('🛑 Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};