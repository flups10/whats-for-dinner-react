import { useState, useEffect } from "react"
import { useGetAllDinnerMutation } from "../slices/dinnerApiSlice.js"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Card } from "react-bootstrap"

const ProfileScreen = () => {

    const [getAllDinner, {isLoading}] = useGetAllDinnerMutation()

    const initialState = async () => {
        const allDinner = await getAllDinner()
        setOwnDinner(allDinner.data.filter(d => d.User == userInfo.id))
    }

    const [ownDinner, setOwnDinner] = useState(initialState)

    const navigate = useNavigate()

    const {userInfo} = useSelector((state) => state.auth)

    useEffect(()=> {
        if(!userInfo){
            navigate('/login')
        }
    }, [navigate, userInfo]) 




    return (
        <div>
            <h1 onClick={()=>console.log(ownDinner.length)}>
                ProfileScreen
            </h1>
            <h2>User Data:</h2>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>

            <p>Image Url: {userInfo.imageUrl}</p>
            <img className="my-3" src={userInfo.imageUrl} alt="This image was not found" height='300vh'/><br />
            {/* Edit Link */}
            <Link to={'/edit-user-data'}>
                Edit user data
            </Link>

            <h2 className="mt-5">Your Custom Dinners</h2>
            {ownDinner.length > 1 ? (
                ownDinner.map(d => (
                    <>
                        <Card className="mt-2">

                            <Card.Body>
                            <Card.Title className="mt-2">{d.name}</Card.Title>
                                <Card.Img className="mt-2" variant="aside" src={d.imageUrl} height='300vh' alt="no image for this dish" />
                            <Card.Text className="mt-2">
                                Recipe
                            </Card.Text>
                            </Card.Body>
                            	<Link className="mx-3 my-2" to={`/update-custom-dinner/${d._id}`}>Edit</Link>
                        </Card>
                    </>
                ))

            ) : (<p>You have no custom Dinners </p>)}
        </div>
    )
}

export default ProfileScreen