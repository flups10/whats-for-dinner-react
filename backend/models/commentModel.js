import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Dinner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dinner'
    }

}, {timestamps:true})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment