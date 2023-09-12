import  express from "express";
import {
    getAllDinner,
    getOneDinner,
    addCustomDinner,
    updateCustomDinner,
    deleteCustomDinner
} from '../controllers/dinnerController.js'

const router = express.Router()

// dinner Routers
router.post('/', getAllDinner)
router.post('/get-one-dinner', getOneDinner)
router.post('/add-custom-dinner', addCustomDinner),
router.post('/update-custom-dinner', updateCustomDinner)
router.post('/delete-custom-dinner', deleteCustomDinner)

export default router