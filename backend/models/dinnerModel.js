import mongoose from "mongoose";

const dinnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: [2, "please make the name longer"]
    },
    highProtein: {
        type: Boolean,
        required: true,
        default: false
    },
    vega: {
        type: Boolean,
        required: true,
        default: false
    },
    persons: {
        type: Number,
        required: true,
        default: 1
    },
    ingredients: {
        type: Array,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
        minLenght: [5, "please add more characters to your description"]
    },
    cuisine: {
        type: String,
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    Comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    custom: {
        type: Boolean,
        required: true,
    },
    time: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
        default: null
    }
}, {timestamps: true})

const Dinner = mongoose.model('Dinner', dinnerSchema)

export default Dinner