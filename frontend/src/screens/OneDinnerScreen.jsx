import React, { useEffect, useState } from "react";
import { useGetOneDinnerMutation, useDeleteDinnerMutation } from "../slices/dinnerApiSlice.js";
import { useAddCommentMutation, useDeleteCommentMutation} from '../slices/commentSlice.js'
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { toast } from "react-toastify";

const OneDinnerScreen = () => {

    let {id} = useParams();

    const {userInfo} = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const [getOneDinner, {isLoading}] = useGetOneDinnerMutation()
    const [deleteCustomDinner] = useDeleteDinnerMutation()
    const [addComment] = useAddCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    
    
    const initialState = async () => {
        const thisDinner = await getOneDinner({dinnerId: id})
        setCurrentDinner(thisDinner.data)
    }
    
    const [currentDinner, setCurrentDinner] = useState(initialState)
    const [newComment, setNewComment] = useState('')

    const submitHandler =  async (e) => {
        e.preventDefault()

        try {
            await addComment({
                dinnerId: id,
                comment: newComment,
                userId: userInfo.id
            })

            const update = await getOneDinner({dinnerId: id})

            setCurrentDinner(update.data)
            setNewComment('')


        } catch (error) {
            toast.error(error)
        }
    }

    const handeDeleteComment = async (cid) => {
        await deleteComment({commentId: cid})
        const update = await getOneDinner({dinnerId: id})

        setCurrentDinner(update.data)
    }

    const handleDeleteDinner = async (did) => {
        await deleteCustomDinner({id: did})

        navigate('/')
    }


    return (
        <>
            {currentDinner.name ? (

            <>
                <h3 onClick={()=>{console.log(currentDinner)}}>{currentDinner.name}</h3>
                <img src={currentDinner.imageUrl} alt="No Image for this dish" height={'300vh'} /><br/>
                {currentDinner.highProtein ? (<Button className="bg-succes">High Protein</Button>): (null)}
                {currentDinner.vega ? (<Button className="bg-succes">Vega</Button>): (null)}

                <h4>Ingredients:</h4>
                <ol>
                    {currentDinner.ingredients.map(i => (
                        <li key={i.name} className="capitalize">{i.ingredient}</li>
                    ))}
                </ol>
                <p>Cooking Time: {currentDinner.time} minutes</p>
                
                <p>Cuisine: {currentDinner.cuisine}</p>
                <p>Recipe : {currentDinner.recipe}</p>
                                
                {currentDinner.custom ? (
                <>
                {userInfo !== null && currentDinner.User._id == userInfo.id ? (
                    <div>
                        <div>
                        <Link to={`/update-custom-dinner/${currentDinner._id}`}>
                            <Button>
                                Edit Dinner
                            </Button>
                        </Link>

                        <Button onClick={()=>{handleDeleteDinner(currentDinner._id)}}>
                            Delete dish
                        </Button>
                        </div>
                        <FormContainer>
                            <h5>Comments</h5>
                            <Form onSubmit={submitHandler}>
                                <Form.Label htmlFor="comment">
                                    Leave a comment!
                                </Form.Label>
                                <Form.Control
                                type="text"
                                id="comment"
                                placeholder="Enter comment here"
                                value={newComment}
                                onChange={(e)=> { setNewComment(e.target.value)}}></Form.Control>
                                <Button type="submit">Add comment</Button>
                            </Form>
                        </FormContainer>
                    </div>
                ) : (<p>Log in to leave a comment</p>)}
                </>
                ) : (null)}
                
                {currentDinner.Comments.map(c => (
                    <p key={c._id}>{c.comment}<Button onClick={()=>{handeDeleteComment(c._id)}}>Delete</Button></p>
                ))}
            </>
            ) : (
                <Loader/>
            )}
            

            {isLoading && <Loader />}
        </>
    )
}

export default OneDinnerScreen