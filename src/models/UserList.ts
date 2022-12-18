import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const UserListSchema = new mongoose.Schema({
    name: String,
    ticket: Number,
    userId: ObjectId,
});

var UserList = mongoose.models.UserList || mongoose.model('UserList', UserListSchema);

module.exports = UserList;
