import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const IngredientForm = ({onAddIngredient}) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddIngredient(text)
        setText('')
    }

    return(
        <>
            <Form.Group className="my-2">
                <Form.Label>
                    New ingredient:
                </Form.Label>
                <Form.Control
                type="text"
                value={text}
                onChange={(e)=>(setText(e.target.value))}>
                </Form.Control>
            </Form.Group>
            <Button type="button" onClick={handleSubmit}>
                Add Ingredient
            </Button>
        </>
    )
}

export default IngredientForm