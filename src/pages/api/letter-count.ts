import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
// import Letter from '../../models/Letter';
import _ from 'lodash';
const Letter = require('../../models/Letter');

const getLetterCount = () => {
    return Letter.distinct('from');
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
            const letters = await getLetterCount();
            console.log('+++ +++', letters.length);
            res.status(200).json({count: letters.length});
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
