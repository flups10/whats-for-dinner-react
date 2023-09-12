import { Col, Row} from 'react-bootstrap'
import './SliderSwitch.css'


const SliderSwitch = (item) => {

    return (
            <Row className=''>

                <Col xs={8}>
                    <label htmlFor={item.item}>
                        {item.item}
                    </label>
                </Col>
                <Col xs={4}>
                    <label>
                        <div className="switch"> 
                            <input type="checkbox" id={item.item}/>
                            <span className="slider round"></span>
                        </div>
                    </label>
                </Col>
            </Row>
    )
}

export default SliderSwitch