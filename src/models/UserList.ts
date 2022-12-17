import mongoose from 'mongoose';

const UserListSchema = new mongoose.Schema({
    name: String,
    ticket: Number,
});

var UserList = mongoose.models.UserList || mongoose.model('UserList', UserListSchema);

module.exports = UserList;
