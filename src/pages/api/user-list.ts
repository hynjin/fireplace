import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'util/mongodbClient';
import connectToDatabase from 'util/mongoose';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const UserList = require('../../models/UserList');

const getUserList = (query: any) => {
    if (query?.name) {
        return UserList.find({ name: query?.name });
    }
    return UserList.find({}, { name:1 } ).sort( { name: 1 } );
};

const addUser = (letter: any) => {
    try {
        console.log('+++ add letters post unset',);
        const members = ["[PUBLY]문종혁", "Byeongsoo Kim","Byunghun Kim","Dahee Jeong","Donghun Lee","Eunbyeol Ko","Eunseo Kim","Gayeon Kim","Ha Luong","Heejun Kim","Hongjae Eum","Hungjoon Kim","Hyojoo Byun","Hyunjin Kim","Hyunsoo Lee","Hyunsun Park","Jaemin Chung","Jaesung Kim","Jaeyong Jung","Jieun Kim","Jiho Kim","Jiwon Ahn","Jiwon Cha","Jiwon Kim","Junghyun Son","Kwangjong Kim","Minhyo Kim","Minjeong Joo","Minjeong Joo","Minji Cho","Minsu Kwon","Myeongchan Kim","Naon Shin","Sehoon Park","Seoji Kang","Seoryun Lee","Seunghyun Lee","Seungkook Lee","Sinyoung Park","Sohee Jeong","Sol Oh","Sori Park","Soryoung Park","Sueun Chang","Suhee Choi","Sungwon Wi","Van Anh Nguyen","Woojin Hwang","Yevin Park","Yewon Moon","Youngjoon Oh","Yunha Bae"];
        _.forEach(members, member => {
            UserList.create({
                name: member,
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

const updateUser = (body: any) => {
    const { userId, name } = body;
    return UserList.findOneAndUpdate(
        { "name" : name },
        { $set: { userId: new ObjectId(userId) }, }
    );
}

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
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
        await connectToDatabase();

        switch (method) {
            case 'GET':
                const users = await getUserList(query);
                // console.log('+++ call users',  users);
                res.status(200).json(users);
                break;
            case 'POST':
                // console.log('+++ call letters post', body);
                // const result = await addUser(body);
                const { userId } = body;
                let result;
                if (userId) {
                    result = await updateUser(body);
                } else {
                    result = await spendTicket(body);
                }
                // console.log('++ resut', result);
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
    } else {
        res.status(401).end('Not Authorized');
    }
    // con.disconnect();
}
