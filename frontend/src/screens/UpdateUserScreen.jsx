import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserDataMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import {toast} from 'react-toastify'
import Loader from '../components/Loader.jsx'

const UpdateUserScreen = () => {
    const{userInfo} = useSelector((state) => state.auth)


    const [email, setEmail] = useState(userInfo.email)
    const [name, setName] = useState(userInfo.name)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [imageUrl, setImageUrl] = useState(userInfo.imageUrl)

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [update, {isLoading}] = useUpdateUserDataMutation()


    useEffect(()=>{
        if (!userInfo){
            navigate('/')
        }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(newPassword !== newConfirmPassword){
            toast.error('passwords dont match')
        } else{
            try {
                const res = await update({ name, email, password, imageUrl, newPassword, id: userInfo.id}).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/profile')
            } catch (err) {
                toast.error(err?.data?.message || err.error )
            }
        }
    }

    return (
        <FormContainer>
            <h1>Update User Data</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" id='name'>
                    <Form.Label>Name, required</Form.Label>
                    <Form.Control type="name1" placeholder="Enter name"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='email'>
                    <Form.Label>Email Adress, required</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='password'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='confirmedPassword'>
                    <Form.Label>Password confirm</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password"
                    value={newConfirmPassword} 
                    onChange={(e)=>setNewConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='imageUrl'>
                    <Form.Label>Image URL, not required</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image URL"
                    value={imageUrl} 
                    onChange={(e)=>setImageUrl(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" className="mt-3" variant="primary">
                   Update
                </Button>

                {isLoading && <Loader />}

            </Form>
        </FormContainer>
    )
}

export default UpdateUserScreen;
