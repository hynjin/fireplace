import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
import _ from 'lodash';

const UserList = require('../../models/UserList');

const getUserList = () => {
    return UserList.find().sort( { name: 1 } );
};

const addUser = (letter: any) => {
    try {
        console.log('+++ add letters post unset',);
        const t =            ["[PUBLY]문종혁", "Byeongsoo Kim","Byunghun Kim","Dahee Jeong","Donghun Lee","Eunbyeol Ko","Eunseo Kim","Gayeon Kim","Ha Luong","Heejun Kim","Hongjae Eum","Hungjoon Kim","Hyojoo Byun","Hyunjin Kim","Hyunsoo Lee","Hyunsun Park","Jaemin Chung","Jaesung Kim","Jaeyong Jung","Jieun Kim","Jiho Kim","Jiwon Ahn","Jiwon Cha","Jiwon Kim","Junghyun Son","Kwangjong Kim","Minhyo Kim","Minjeong Joo","Minjeong Joo","Minji Cho","Minsu Kwon","Myeongchan Kim","Naon Shin","Sehoon Park","Seoji Kang","Seoryun Lee","Seunghyun Lee","Seungkook Lee","Sinyoung Park","Sohee Jeong","Sol Oh","Sori Park","Soryoung Park","Sueun Chang","Suhee Choi","Sungwon Wi","Van Anh Nguyen","Woojin Hwang","Yevin Park","Yewon Moon","Youngjoon Oh","Yunha Bae"];
        _.forEach(t, ll => {
            UserList.create({
                name: ll,
                ticket: 1,
                updated_at: new Date(),
            });
        });

        // return UserList.create({
        //     ...letter,
        //     updated_at: new Date(),
        // });
    } catch (e) {
        console.log('error at add letters');
    }
};

const spendTicket = (body: any) => {
    return UserList.findOneAndUpdate(
        { "name" : body?.name },
        { $inc: { ticket: -1 }, }
    );

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
            console.log('+++ call letters post', body);
            // const result = await addUser(body);

            const result = await spendTicket(body);
            console.log('++ resut');
            res.status(200).json(result);
            break;
        // case 'DELETE':
        //     const { letter_id } = body;
        //     console.log('+++ call restaurants delete', letter_id);
        //     await deleteLetter(letter_id);
        //     break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    // con.disconnect();
}


import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

