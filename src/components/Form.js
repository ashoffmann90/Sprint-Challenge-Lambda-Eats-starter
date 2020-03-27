import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().min(2, 'Must be at least two characters').required('Name is a required field'),
    size: yup.string(),
    pineapple: yup.boolean(),
    jalapenos: yup.boolean(),
    sauerkraut: yup.boolean(),
    garlic: yup.boolean(),
    instructions: yup.string()
})


function Form() {
    const [formState, setFormState] = useState({
        name:'',
        size:'',
        pineapple:'',
        jalapenos:'',
        sauerkraut:'',
        garlic:'',
        instructions:''
    })

    const [errors, setErrors] = useState({
        name:'',       
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [formState])

    const inputChange = e => {
        e.persist()
        const newFormData = {
            ...formState, 
            [e.target.name] : e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        validateChange(e)
        setFormState(newFormData)
    }

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
        .then(valid => {
            setErrors({
                ...errors, [e.target.name] : ''
            })
        })
        .catch(error => {
            setErrors({
                ...errors, [e.target.name] : error.errors[0]
            })
        })
    }

    const [post, setPost] = useState([])

    const formSubmit = e => {
        e.preventDefault()
        axios.post('https://reqres.in/api/users', formState)
        .then(response => {
            setPost(response.data)
            setFormState({
                name:'',
                size:'',
                pineapple:'',
                jalapenos:'',
                sauerkraut:'',
                garlic:'',
                instructions:''
            })
        })
        .catch(error=> console.log(error.response))
    }

    return(
        <>
            <h1>PIZZA</h1>
            <form onSubmit={formSubmit}>
                <label htmlFor='name'>Name:
                    <input 
                        name='name'
                        type='text'
                        onChange={inputChange}
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label>
                <br/>
                <label htmlFor='size'>Size:<br/>
                    <select name='size' id='positions' onChange={inputChange}>
                        <option value='Itty Bitty'>Itty Bitty</option>
                        <option value='Not Big, Not Little'>Not Big, Not Little</option>
                        <option value='Chonk'>Chonk</option>
                        <option value='This Pizza Eats You Instead'>This Pizza Eats You Instead</option>
                    </select>
                </label>
                <br/>
                <label htmlFor='toppings'>Toppings:<br/>
                    <label>Pineapple
                        <input name='pineapple' type='checkbox'
                        onChange={inputChange}/>
                    </label>
                    <br/>
                    <label>Jalapenos
                        <input name='jalapenos' type='checkbox'
                        onChange={inputChange}/>
                    </label>
                    <br/>
                    <label>Sauerkraut
                        <input name='sauerkraut' type='checkbox'
                        onChange={inputChange}/>
                    </label>
                    <br/>
                    <label>Garlic
                        <input name='garlic' type='checkbox'
                        onChange={inputChange}/>
                    </label>
                    <br/>
                </label>
                <br/>
                <label htmlFor='instructions'>Special Instructions:<br/>
                    <textarea name='instructions'
                    onChange={inputChange}/>
                </label>
                <br/>
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button data-cy='submit' disabled={buttonDisabled}>
                    Add to Order
                </button>
            </form>
        </>
    )
}

export default Form