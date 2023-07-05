import mongoose, {connection, Expression} from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        connection.on('connected', () => {
            console.log('Connected to the mongodb successfully')
        });
        connection.on('error', (e) => {
            console.log("Error While Connection Database: ", e);
        });
    } catch (e) {
        console.log("Error While Connection Database: ", e);
    }
}
