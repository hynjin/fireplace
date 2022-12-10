import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../util/mongoose';
import _ from 'lodash';
const User = require('../../models/User');

const getAllUsers = (name?: string | string[]) => {
    if (name) {
        return User.find( { name: { $ne: name } } );
    }
    return User.find();
};

// const addLetter = (letter: any) => {
//     try {
//         console.log('+++ add letters post', letter);
//         return Letter.create({
//             ...letter,
//             updated_at: new Date(),
//         });
//     } catch (e) {
//         console.log('error at add letters');
//     }
// };

// const deleteLetter = (letter_id: any) => {
//     try {
//         return Letter.findOneAndDelete({ _id: letter_id });
//     } catch (e) {
//         console.log('error at add letters');
//     }
// };

export default async function lettersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const { name } = query;
            const users = await getAllUsers(name);
            console.log('+++ call users', name, users);
            res.status(200).json(users);
            break;
        // case 'POST':
        //     console.log('+++ call letters post');
        //     const result = await addLetter(body);
        //     res.status(200).json(result.insertedId);
        //     break;
        // case 'DELETE':
        //     const { letter_id } = body;
        //     console.log('+++ call restaurants delete', letter_id);
        //     await deleteLetter(letter_id);
        //     break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
