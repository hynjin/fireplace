import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = global.mongoose;

if (!cachedDb) {
    cachedDb = global.mongoose = { conn: null, promise: null };
}

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

export async function connectToDatabase() {
    // return;
    console.log('+++ ??');
    if (cachedDb && cachedDb.conn) {
        console.log('=> using cached database ');
        // console.log('+++ ???',  cachedDb?.promise);
        return cachedDb.conn;
    }
    if (cachedDb && cachedDb.serverConfig?.isConnected()) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }

    if (!cachedDb?.promise) {
        const opts = {
            maxPoolSize: 2,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };

        cachedDb.promise = mongoose
            .createConnection(MONGODB_URI, opts);
    }

    console.log('=> new database instance');
    cachedDb.conn = await cachedDb.promise;
    return cachedDb.conn;
}

export default connectToDatabase;
