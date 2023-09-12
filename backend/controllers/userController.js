import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt, { genSalt } from 'bcrypt'


// Auth user/ set jwtToken
const authUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl
        });
    } else {
        res.status(401)
        throw new Error('Incorrect data')
    }
})

// Auth user/ set jwtToken
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password, imageUrl} = req.body

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('Email aleady taken')
    }

    const user = await User.create({
        name,
        email,
        password,
        imageUrl
    })

    if(user){
        console.log(user)
        generateToken(res, user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl
        });
    } else {
        res.status(401)
        throw new Error('Incorrect data')
    }
})

// Log out
const logoutUser = asyncHandler( async (req, res) => {
    
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.json({message: 'Logged Out'})
})


// Update profile
const updateUserProfile = asyncHandler( async (req, res) => {
    const {id, imageUrl, name, password, newPassword} = req.body
    
    const user = await User.findByIdAndUpdate({_id: id})

    if (password !== '' && newPassword !== ''){
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (passwordCheck){

            const salt = await genSalt(10)
            const newPass = await bcrypt.hashSync(newPassword, salt)
            user.password = newPass
        } else {
            throw new Error ('Current password is not correct')
        }
    }

    user.imageUrl = imageUrl
    user.name = name
    user.save()

    res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl
    })
})

export { 
    authUser,
    registerUser,
    logoutUser,
    updateUserProfile
}
