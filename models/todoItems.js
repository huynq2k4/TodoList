import mongoose from 'mongoose';

const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})

export default mongoose.model("todo", TodoItemSchema);