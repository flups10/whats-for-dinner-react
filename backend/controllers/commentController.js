import Comment from '../models/commentModel.js'
import User from '../models/userModel.js'
import Dinner from '../models/dinnerModel.js'
import asyncHandler from 'express-async-handler'

// Add Comment
const addComment = asyncHandler (async(req, res ) => {
    const {dinnerId, userId, comment} = req.body

    console.log(req.body)
    const newComment = await Comment.create({
        comment,
        Dinner: dinnerId,
        User: userId
    })

    const user = await User.findById({_id: userId})
    const dinner = await Dinner.findById({_id: dinnerId})

    user.Comments = [...user.Comments, newComment._id]
    dinner.Comments = [...dinner.Comments, newComment._id]

    user.save()
    dinner.save()
    res.send('comment added')
})

// Delete Comment
const deleteComment = asyncHandler (async (req, res) => {
    const {commentId} = req.body
    await Comment.findByIdAndDelete(commentId)
    res.send('comment deleted')
})

export {
    addComment,
    deleteComment
}
