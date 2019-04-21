import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NoteSchema);
