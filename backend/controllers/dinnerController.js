import asyncHandler from 'express-async-handler'
import Dinner from "../models/dinnerModel.js"
import User from '../models/userModel.js'


// Get dinner
const getAllDinner = asyncHandler(async (req, res) => {
    const allDinner = await Dinner.find()
    res.json(allDinner)
})

// Get dinner
const getOneDinner = asyncHandler(async (req, res) => {
    const {dinnerId} = req.body

    const oneDinner = await Dinner.findById({_id:dinnerId})
        .populate({path: 'Comments', model: 'Comment'})
        .populate('User')
    res.json(oneDinner)
})

// Add custom dinner
const addCustomDinner = asyncHandler(async (req,res) => {
    const {name, protein, vega, cuisine, persons, time, recipe, author, ingredients, image} = req.body

    const dinner = await Dinner.create({
        name,
        highProtein: protein,
        vega,
        recipe,
        cuisine,
        persons,
        time,
        User: author,
        ingredients,
        imageUrl: image,
        custom: true,
    })

    const user = await User.findById({_id: author})
    user.customDinners = [...user.customDinners, dinner._id] 
    user.save()

    res.send('Add custom diner')
})


// Update custom dinner
const updateCustomDinner = asyncHandler(async (req,res) => {

    const {name, vega, protein, cuisine, persons, time, recipe, image, ingredients, id}  = req.body
    const dinner = await Dinner.findById(id)

    dinner.name = name
    dinner.vega = vega
    dinner.highProtein = protein
    dinner.cuisine = cuisine
    dinner.persons = persons
    dinner.time = time
    dinner.recipe = recipe
    dinner.imageUrl = image
    dinner.ingredients = ingredients
    dinner.save()
    res.send('update custom dinner')
})

// Delete custom dinner
const deleteCustomDinner = asyncHandler(async (req, res) => {
    console.log(req.body);
    await Dinner.findByIdAndDelete({_id: req.body.id})
    res.send('delete')
})

export {
    getAllDinner,
    getOneDinner,
    addCustomDinner,
    updateCustomDinner,
    deleteCustomDinner
}