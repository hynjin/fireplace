import mongoose from 'mongoose';

const UserListSchema = new mongoose.Schema({
    list: Array,
});

const UserList = mongoose.models.UserList || mongoose.model('User-list', UserListSchema);

module.exports = UserList;
