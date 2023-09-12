import express from "express";
import { addComment, deleteComment } from '../controllers/commentController.js'

const router = express.Router()

router.post('/add-comment', addComment)
router.post('/delete-comment', deleteComment)

export default router