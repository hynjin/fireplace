import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
// import Letter from '../../models/Letter';
import _ from 'lodash';
const Letter = require('../../models/Letter');

const getLetterCount = (name?: string | string[]) => {
    return Letter.aggregate([
        {"$group" : {'_id':"$to", count:{$sum:1}}}
    ]);
    // return Letter.distinct('from');
    // .aggregate([
    //     {"$group" : {'_id':"$from", count:{$sum:1}}}
    // ]);
};

export default async function letterCountHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const { name } = query;
            const letters = await getLetterCount(name);
            console.log('+++ +++', letters);
            res.status(200).json(letters);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
