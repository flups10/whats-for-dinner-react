import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import Loader from '../components/Loader'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [register, {isLoading}] = useRegisterMutation()

    const{userInfo} = useSelector((state) => state.auth)

    useEffect(()=>{
        if (userInfo){
            navigate('/')
        }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('passwords dont match')
        } else{
            try {
                const res = await register({ name, email, password, imageUrl }).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" id='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name1" placeholder="Enter name"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" id='email'>
                    <Form.Label>Email Adress</Form.Label>
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

                <Form.Group className="my-2" id='confirmedPassword'>
                    <Form.Label>Password confirm</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password"
                    value={confirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)}
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
                    Register
                </Button>

                {isLoading && <Loader />}

                <Row className="py-3">
                    <Col>
                        Already a User? <Link to='/login'>Sign in</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;
