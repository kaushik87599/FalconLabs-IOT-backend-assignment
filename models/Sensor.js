import mongoose from 'mongoose';

// Schema at glance
// • deviceId  : string  (required)
// • temperature: number  (required)
// • timestamp : number  (epoch ms, optional — defaults to Date.now)
// • createdAt / updatedAt: auto-managed by Mongoose timestamps option
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
    }
}, { collection: 'sensors', timestamps: true });

// Compound index — speeds up "latest reading per device" queries
sensorSchema.index({ deviceId: 1, timestamp: -1 });

const SensorDBModel = mongoose.model('Sensor', sensorSchema);
export default SensorDBModel;