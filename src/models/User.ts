import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User
