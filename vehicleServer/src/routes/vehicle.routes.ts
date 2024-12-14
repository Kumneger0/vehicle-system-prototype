import cors from 'cors';
import express from 'express';
import { addVehicle, getAllVehicles, updateVehicleStatus } from '../controllers/vehicle.controller';
const router = express.Router();

router.use(cors())
router.post('/add', addVehicle);
router.get('/all', getAllVehicles);
router.put('/update/:id', updateVehicleStatus);

export default router