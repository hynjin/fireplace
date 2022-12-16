import mongoose from 'mongoose';

const UserListSchema = new mongoose.Schema({
    name: String,
    ticket: Number,
});

const UserList = mongoose.models.UserList || mongoose.model('User-list', UserListSchema);

module.exports = UserList;
