import mongoose from 'mongoose';

// Schema at glance
// • deviceId: string
// • temperature: number
// • timestamp: number (epoch ms)
// • createdAt: ISO date (default: now)
const sensorSchema = new mongoose.Schema({
    deviceId:{
        type: String,
        required: true
    },
    temperature:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Number,
        default: Date.now
        
        
    },
    createdAt:{
        type: Date,
        default: Date.now
    }


},{collection:'sensors'});

const SensorDBModel = mongoose.model('Sensor', sensorSchema);
export default SensorDBModel;