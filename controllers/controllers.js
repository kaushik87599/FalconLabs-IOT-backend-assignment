import SensorDBModel from "../models/Sensor.js";

export const ingestReading =  async (req, res)=>{
    try{
        const {deviceId, temperature, timestamp} = req.body;
        if(!deviceId || !temperature || !timestamp){
            return res.status(400).json({message: "All fields are required"});
        }
        const newReading = new SensorDBModel({
            deviceId,
            temperature,
            timestamp
        });
        await newReading.save();
        // console.log({
        //     deviceId,
        //     temperature,
        //     timestamp
        // })
        return res.status(201).json({message: "Reading ingested successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

};


export const latestReadings = async (req,res)=>{
    try{
        const {deviceId} = req.params;
        if(!deviceId){
            return res.status(400).json({message: "Device ID is required"});
        }

        const reading = await SensorDBModel.findOne({deviceId: deviceId}).sort({timestamp: -1});
        if(!reading){
            return res.status(404).json({message: "No reading found for this device"});
        }
        return res.status(200).json({message: "Reading found successfully", reading});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
};