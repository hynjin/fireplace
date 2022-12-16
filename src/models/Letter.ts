import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const LetterSchema = new mongoose.Schema({
    sender: String,
    reciever: String,
    content: String,
    updated_at: Date,
    anonymous: Boolean,
    present: Array,
});

const Letter = mongoose.models.Letter || mongoose.model('Letter', LetterSchema);

module.exports = Letter
// export default Letter;
