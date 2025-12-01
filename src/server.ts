import express, { Request, Response } from 'express';
import path from 'path';
import { PicoPlacaEvaluator } from './core/PicoPlacaEvaluator';
import { EcuadorianHolidayChecker } from './core/EcuadorianHolidayChecker';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Initialize core dependencies
const holidayChecker = new EcuadorianHolidayChecker();
const evaluator = new PicoPlacaEvaluator(holidayChecker);

interface PredictRequest {
  plate: string;
  date: string;
  time: string;
}

// API Endpoint
app.post('/api/predict', (req: Request, res: Response) => {
  try {
    const { plate, date, time } = req.body as PredictRequest;

    if (!plate || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields: plate, date, time' });
    }

    // Basic validation (can be expanded)
    if (!/^[A-Z]{3}-\d{3,4}$/.test(plate)) {
      return res
        .status(400)
        .json({ error: 'Invalid plate format. Expected "ABC-1234" or "ABC-123"' });
    }

    const canDrive = evaluator.canDrive(plate, date, time);

    return res.json({
      canDrive,
      message: canDrive ? 'You are allowed to drive.' : 'Restriction active! You cannot drive.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server only if run directly (not imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
