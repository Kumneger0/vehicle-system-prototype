import express from 'express';
import cors from 'cors'
import { addVehicle, getAllVehicles, updateVehicleStatus, getSpecificVehicle } from '../controllers/vehicle.controller';
const router = express.Router();

router.use(cors())
router.post('/add', addVehicle);
router.get('/all', getAllVehicles);
router.put('/update/:id', updateVehicleStatus);
router.get('/specific/:id', getSpecificVehicle)

export default router