import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

const Config = require('../../models/Config');

const getConfig = () => {
    return Config.find();
};

export default async function configHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    const client =  await clientPromise;
    // const con = 
    await connectToDatabase();

    switch (method) {
        case 'GET':
            const result = await getConfig();
            console.log('+++ re', result);
            res.status(200).json(result);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    // con.disconnect();
}


import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

