import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SliderSwitch from './SliderSwitch';
import './Hero.css'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useGetAllDinnerMutation } from '../slices/dinnerApiSlice';
import { useState } from 'react';
import {toast} from 'react-toastify'


const Hero = () => {

  const [vega, setVega] = useState(false)
  const [highProtein, setHighProtein] = useState(false)
  const [ownCustomDinner, setOwnCustomDinner] = useState(false)
  const [customDinner, setCustomDinner] = useState(false)
  const [persons, setPersons] = useState(false)
  const [time, setTime] = useState(false)
  const [cuisine, setCuisine] = useState(false)
  const [randomDinner, setRandomDinner] = useState({})
  
  const { userInfo } = useSelector((state) => state.auth)
  
  const [getAllDinner, { isLoading }] = useGetAllDinnerMutation()

  const initialState = async () => {
    const allDinner = await getAllDinner()
    setDinner(allDinner.data)
  }

  const [dinner, setDinner] = useState(initialState)

  const submitHandler = async (e) => {
    e.preventDefault()

    let arr = dinner

    if (vega){
      arr = arr.filter((d) => d.vega === vega)
    }
    if( highProtein){
      arr = arr.filter((p) => p.highProtein === highProtein)
    }
    if(cuisine){
      arr = arr.filter((c) => c.cuisine === cuisine)
    }
    if (time){
      arr = arr.filter((t) => t.time <= time)
    }
    if( persons){
      arr = arr.filter((p) => p.persons <= persons)
    }

    let customDinnerCheck = arr

      if (ownCustomDinner) {
        // Only Own Custom Dinner
        customDinnerCheck = arr.filter((p) => p.custom === ownCustomDinner && p.User == userInfo.id)
      } else if (customDinner) {
        // All custom dinners
        console.log('all Dinners')
      } else {
        // No custom Dinner
        customDinnerCheck = arr.filter((p) => p.custom === false)
      }
    

    if (customDinnerCheck.length < 1 ){
      toast.error('No dinners in Database with current options')
    } else {
      setRandomDinner(customDinnerCheck[Math.floor(Math.random() * customDinnerCheck.length)]);
    }

  }

  return (
    <Row className='py-5'>
      <Col xs={12}>
        <Container className='d-flex justify-content-center'>
          <h1>What's for dinner?</h1>
        </Container>
      </Col>
      <Row>
        <Col xs='6'>
          <Form onSubmit={submitHandler}>
            {/* Vega */}
            <Row className='mt-4'>
              <Col xs={6}>
                <label htmlFor='vega'>
                  Vega
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div className="switch">
                    <input type="checkbox" id='vega' onChange={() => { setVega(!vega) }} />
                    <span className="slider round"></span>
                  </div>
                </label>
              </Col>
            </Row>
            {/* High Protein */}
            <Row className='mt-4'>
              <Col xs={6}>
                <label htmlFor='highProtein'>
                  High Protein
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div className="switch">
                    <input type="checkbox" id='highProtein' onChange={() => { setHighProtein(!highProtein) }} />
                    <span className="slider round"></span>
                  </div>
                </label>
              </Col>
            </Row>
            {/* Persons */}
            <Row className='mt-4'>
              <Col xs={6} >
                <label htmlFor="persons">
                  Persons
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <Form.Select onChange={(e) => { setPersons(e.target.value) }} name="persons" id="persons">
                    <option value={false}>No preference</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </Form.Select>
                </label>
              </Col>
            </Row>
            {/* Time */}
            <Row className='mt-4'>
              <Col xs={6} >
                <label htmlFor="time">
                  Time
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <Form.Select onChange={(e) => { setTime(e.target.value) }} name="time" id="time">
                    <option value={false}>I got all the time</option>
                    <option value={15}>15-</option>
                    <option value={30}>30-</option>
                    <option value={45}>45-</option>
                    <option value={999}>45+</option>
                  </Form.Select>
                </label>
              </Col>
            </Row>
            {/* Cuisines */}
            <Row className='mt-4'>
              <Col xs={6} >
                <label htmlFor="cuisine">
                  Cuisine
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <Form.Select onChange={(e) => { setCuisine(e.target.value) }} name="cuisine" id="cuisine">
                    <option value={false}>No preference</option>
                    <option value={'other'}>Other</option>
                    <option value={'chinese'}>Chinese</option>
                    <option value={'italian'}>Italian</option>
                    <option value={'turkish'}>Turkish</option>
                  </Form.Select>
                </label>
              </Col>
            </Row>
            {/* Own Custom */}
            <Row className='mt-4'>
              <Col xs={6}>
                <label htmlFor='ownCustomDinner'>
                  Custom Dinners
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div className="switch">
                    <input type="checkbox" id='ownCustomDinner' onChange={() => { setCustomDinner(!customDinner) }} />
                    <span className="slider round"></span>
                  </div>
                </label>
              </Col>
            </Row>
            {/* Other Costum !RISK */}
            <Row className='mt-4'>
              <Col xs={6}>
                <label htmlFor='otherCustomDinner'>
                  Only Own Custom Dinners
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div className="switch">
                    <input type="checkbox" id='otherCustomDinner' onChange={() => { setOwnCustomDinner(!ownCustomDinner) }} />
                    <span className="slider round"></span>
                  </div>
                </label>
              </Col>
            </Row>
            {/* Submit */}
            <Button type="submit" className="mt-5" variant="primary">
              Submit options
            </Button>
          </Form>
          <Col>
            <Link to={'/add-custom-dinner'}>
              Add custom dinner
            </Link>
          </Col>
        </Col>
        {/* Random Dinner */}
        <Col xs='6'>
          {randomDinner.name !== undefined ? (
            <>
              <h3 className='mt-3'>{randomDinner.name}</h3>
              <img className='mt-4' src={randomDinner.imageUrl} alt="This dinner has no image yet" height='300vh' max-width='100%'/><br />
              <Link to={`/one-dinner/${randomDinner._id}`}>
                <Button className='mt-4 '>
                  Full Recipe
                </Button>
              </Link>
            </>
            ) : (
              <p className='mt-4'>submit options and your dinner will appear here</p>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default Hero;