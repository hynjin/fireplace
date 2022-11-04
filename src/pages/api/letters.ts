import type { NextApiRequest, NextApiResponse } from 'next';
// import { ObjectId } from 'mongodb';
import connectToDatabase from '../../util/mongoose';
// import Letter from '../../models/Letter';
import _ from 'lodash';
const Letter = require('../../models/Letter');

const getAllLetters = () => {
    return Letter.find();
};

const addLetter = (letter: any) => {
    try {
        console.log('+++ add letters post', letter);
        return Letter.create({
            ...letter,
            updated_at: new Date(),
        });
    } catch (e) {
        console.log('error at add letters');
    }
};

const deleteLetter = (letter_id: any) => {
    try {
        return Letter.findOneAndDelete({ _id: letter_id });
    } catch (e) {
        console.log('error at add letters');
    }
};

export default async function lettersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body, method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            const letters = await getAllLetters();
            console.log('+++ call letters', letters);
            res.status(200).json(letters);
            break;
        case 'POST':
            console.log('+++ call letters post');
            const result = await addLetter(body);
            res.status(200).json(result.insertedId);
            break;
        case 'DELETE':
            const { letter_id } = body;
            console.log('+++ call restaurants delete', letter_id);
            await deleteLetter(letter_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
