import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
import _ from 'lodash';

const UserList = require('../../models/UserList');

const getUserList = () => {
    return UserList.find();
};

const addUser = (letter: any) => {
    try {
        console.log('+++ add letters post unset',);
        // _.forEach(letter, ll => {
        //     UserList.create({
        //         name: ll,
        //         ticket: 1,
        //         updated_at: new Date(),
        //     });
        // });

        return UserList.aggregate([
            {
              "$unset": 'list'
            }
          ]);
        // return UserList.create({
        //     ...letter,
        //     updated_at: new Date(),
        // });
    } catch (e) {
        console.log('error at add letters');
    }
};

// const deleteLetter = (letter_id: any) => {
//     try {
//         return Letter.findOneAndDelete({ _id: letter_id });
//     } catch (e) {
//         console.log('error at add letters');
//     }
// };

export default async function userListHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    const client =  await clientPromise;
    // const con = 
    await connectToDatabase();

    switch (method) {
        case 'GET':
            const users = await getUserList();
            // console.log('+++ call users',  users);
            res.status(200).json(users);
            break;
        case 'POST':
            console.log('+++ call letters post');
            const result = await addUser(body);
            // res.status(200).json(result.insertedId);
            break;
        case 'PUT':
            await addUser(body);
            break;
        // case 'DELETE':
        //     const { letter_id } = body;
        //     console.log('+++ call restaurants delete', letter_id);
        //     await deleteLetter(letter_id);
        //     break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    // con.disconnect();
}


import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

