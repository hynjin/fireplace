import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const ConfigSchema = new mongoose.Schema({
    blocked: Boolean,
});

var User = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

module.exports = User
