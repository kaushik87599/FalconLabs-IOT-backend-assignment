import express from 'express';
import dotenv from 'dotenv';
import Init_Database_Connection, { checkConnection } from './configs/db.js';
import sensorRouter from './routes/sensorRoutes.js';
import connectMQTT from './utils/mttqSubcriber.js';
dotenv.config();  

const app = express();

app.use(express.json());
app.use('/api/sensor',sensorRouter);

const PORT = process.env.PORT || 3000;

Init_Database_Connection();
// checkConnection();
connectMQTT();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});