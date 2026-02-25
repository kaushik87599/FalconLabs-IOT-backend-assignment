
import mongoose from 'mongoose';


const Init_Database_Connection= async()=>{
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
        console.log('Database Connection Successfull\n');
    } catch (err) {
        console.log('Database connection Failed : ',err.message);
        process.exit(1);
    }
};

const checkConnection = async()=>{
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to:", mongoose.connection.db.databaseName);
    });
};
export {checkConnection};
export default Init_Database_Connection;
