import { Form, Button, Row, Col} from 'react-bootstrap'
import  FormContainer from '../components/FormContainer.jsx'
import IngredientForm from '../components/IngredientForm.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { useAddCustomDinnerMutation} from '../slices/dinnerApiSlice.js'
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify'
import './CustomDinnerScreen.css'

const CustomDinnerScreen = () => {

    const [name, setName] = useState('')
    const [vega, setVega] = useState(false)
    const [protein, setProtein] = useState(false)
    const [cuisine, setCuisine] = useState('other')
    const [persons, setPersons] = useState(1)
    const [time, setTime] = useState(15)
    const [recipe, setRecipe] = useState('')
    const [image, setImage] = useState('')

    const [ingredients, setIngredients] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [addCustomDinner, {isLoading}] = useAddCustomDinnerMutation()

    const {userInfo} = useSelector((state) => state.auth)

    
    const addIngredient = (text) => {
        
        if (text.length <2){
            	toast.error('New ingredient needs more characters')
        } else {
            const newIngredient = {
                ingredient: text,
                id: uuidv4()
            }
            if (ingredients.length < 1){
                setIngredients([newIngredient])
            } else {
                setIngredients([...ingredients, newIngredient])
            }
        }
    }

    const handleDelete = (id) => {
        setIngredients(ingredients.filter(i => i.id !== id))
    }

    useEffect(()=> {
        if(!userInfo){
            navigate('/login')
        }
    }, [navigate, userInfo]) 

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(userInfo)

        if (name.length <2|| recipe.length <2 ){
            toast.error('please fill out all required fields')
        }

        if ( ingredients.length < 2){
            toast.error('add more ingredients')
        }

        await addCustomDinner({name, vega, protein, cuisine, persons, time, recipe, image, author: userInfo.id, ingredients})

        
    }


    return (
        <> 
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    {/* Dinner Name */}
                    <Form.Group  className='my-2' id='name'>
                        <Form.Label>
                            Name:
                        </Form.Label>
                        <Form.Control
                        type='name' placeholder='Enter dinner name'
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        ></Form.Control>
                    </Form.Group>
                    
                    {/* Vega */}
                    <Form.Group className='my-2' id='vega'>
                        <Form.Check type='checkbox' label='vega' onChange={()=>{setVega(!vega)}}  />
                    </Form.Group>
                    {/* High Protein */}
                    <Form.Group className='my-2' id='protein'>
                        <Form.Check type='checkbox' label='protein' onChange={()=>{setProtein(!protein)}}  />
                    </Form.Group>


                    {/* Ingredients */}
                   
                    <p className='my-4'>
                        Ingredients:
                    </p>
                    <ol>
                    {ingredients.length >= 1 && ingredients.map(i => (
                        <li className="my-2 capitalize" key={i.id} value={i.ingredient}> {i.ingredient} <Button onClick={() => {handleDelete(i.id)}}>X</Button></li>
                    ))}
                    </ol>
                    <IngredientForm onAddIngredient={addIngredient} />
                    {/* Cuisine */}
                    <Form.Group  className='my-2' id='cuisine'>
                        <Form.Label>
                            Cuisine:
                        </Form.Label>
                        <Form.Select value={cuisine} onChange={(e)=>{setCuisine(e.target.value)}}>
                            <option value={'other'}>Other</option>
                            <option value={'chinese'}>Chinese</option>
                            <option value={'italian'}>Italian</option>
                            <option value={'turkish'}>Turkish</option>
                        </Form.Select>
                    </Form.Group>
                    
                    {/* Persons */}
                    <Form.Group  className='my-2' id='persons'>
                        <Form.Label>
                            Persons:
                        </Form.Label>
                        <Form.Select value={persons} onChange={(e)=>{setPersons(e.target.value)}}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </Form.Select>
                    </Form.Group>
                    {/* Time */}
                    <Form.Group  className='my-2' id='time'>
                        <Form.Label value={time} onChange={(e)=>{setTime(e.target.value)}}>
                            Time:
                        </Form.Label>
                        <Form.Select>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={45}>45</option>
                            <option value={999}>60+</option>
                        </Form.Select>
                    </Form.Group>
                    {/* Recipe */}
                    <Form.Group  className='my-2' id='recipe'>
                        <Form.Label>
                            Recipe:
                        </Form.Label>
                        <Form.Control
                        type='recipe' placeholder='Enter reccipe'
                        value={recipe}
                        as='textarea' rows={4}
                        onChange={(e)=>{setRecipe(e.target.value);}}
                        ></Form.Control>
                    </Form.Group>
                    {/* Image URL */}
                    <Form.Group  className='my-2' id='image'>
                        <Form.Label>
                            Image Url:
                        </Form.Label>
                        <Form.Control
                        type='text' placeholder='Enter URL for image'
                        value={image}
                        onChange={(e)=>{setImage(e.target.value);}}
                        ></Form.Control>
                        <span> !not required</span>
                    </Form.Group>
                    <Button type="submit" className="mt-3" variant="primary">
                        Add Custom Dinner
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default CustomDinnerScreen