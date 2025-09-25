import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/auth/auth.route';
import { RideRoutes } from './modules/ride/ride.route';
import { DriverRoutes } from './modules/driver/driver.route';
import { AdminRoutes } from './modules/admin/admin.route';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/rides', RideRoutes);
app.use('/api/drivers', DriverRoutes);
app.use('/api/admin', AdminRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to RideX API!');
});

// Not Found Route
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  
  let errorMessage = 'Something went wrong!';
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  
  res.status(500).json({
    success: false,
    message: errorMessage,
  });
});

export default app;