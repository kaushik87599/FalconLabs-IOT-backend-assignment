import express from 'express';
import { ingestReading, latestReadings } from '../controllers/controllers.js';

const sensorRouter = express.Router();

sensorRouter.post('/ingest', ingestReading);
sensorRouter.get('/:deviceId/latest', latestReadings);

export default sensorRouter;
