import cors from 'cors';
import type { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import { ZodError } from 'zod';
import vehicleRoutes from '../routes/vehicle.routes';
import { ErrorWithStatus } from '../types/types';
import { CustomError } from '../utils/customError';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is Running! 🏃' });
});

app.use('/api/vehicles', vehicleRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  const error = new CustomError('Requested URL Not Found', 404);
  next(error);
});

//Global Error Handler
app.use(
  (
    error: ErrorWithStatus,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    let errorMessage = error.message || 'Internal Server Error!';

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      errorMessage = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; ');
    }

    console.error('🛑 Error: ' + errorMessage);
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.status || 500).json({
      success: false,
      message: errorMessage,
    });
  },
);

app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Page Not Found' });
});

export default app;
