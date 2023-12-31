import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    updateUserProfile
} from '../controllers/userController.js' 
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.post('/update-user-data', updateUserProfile)

export default router;