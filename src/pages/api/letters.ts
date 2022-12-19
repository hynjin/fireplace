import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

const Letter = require('../../models/Letter');
const UserList = require('../../models/UserList');

const getAllLetters = (userId?: string | string[], name?: string | string[], unRead?: boolean) => {
    if (name && !userId) {
        return {};
    }
    if (name) {
        return Letter.find({ reciever: name, isRead: !unRead }).sort({ updated_at: -1 });
    }
    return Letter.find({}, {sender:1, reciever:1, present:1}).sort({ updated_at: -1 });
};

const sendLetter = async (letter: any) => {
    try {
        const result = await Letter.create({
            ...letter,
            isRead: false,
            updated_at: new Date(),
        });
        if (result) {
            await UserList.updateOne(
                { "name" : letter.sender },
                { $inc: { ticket: 1 }, }
                );
        }
        return result;
    } catch (e) {
        console.log('error at add letters');
    }
};

const readLetter = async (body: any) => {
    try {
        const result = await  Letter.findOneAndUpdate(
            { "_id" : new ObjectId(body.letterId) },
            { $set: { isRead: true }, }
        );
        return result;
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

    // const con = 
    await connectToDatabase();

    switch (method) {
        case 'GET':
            const { name, isRead, userId } = query;
            
            const letters = await getAllLetters(userId, name, !!isRead);//_.isNil(filter) ? await getAllLetters(name) : await getUnreadLetters(filter);
            res.status(200).json(letters);
            break;
        case 'POST':
            // console.log('+++ call letters post');
            let result;
            if (body?.letterId) {
                result = await readLetter(body);
            } else {
                result = await sendLetter(body);
            }
            res.status(200).json(result.insertedId);
            break;
        // case 'PUT':
        //     // console.log('+++ call letters post');
        //     await readLetter(body);
        //     res.status(200).json({});
        //     break;
        case 'DELETE':
            const { letter_id } = body;
            // console.log('+++ call restaurants delete', letter_id);
            await deleteLetter(letter_id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    // con.disconnect();
}
