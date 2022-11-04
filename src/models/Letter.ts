import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const LetterSchema = new mongoose.Schema({
    from: String,
    to: String,
    content: String,
    updated_at: Date,
});

const Letter = mongoose.models.Letter || mongoose.model('Letter', LetterSchema);

module.exports = Letter
// export default Letter;
