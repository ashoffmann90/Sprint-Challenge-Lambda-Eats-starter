import React, {useState, useEffect} from "react";
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().min(2, 'Must be at least two characters').required('Name is a required field')
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

const [buttonDisabled, setButtonDisabled] = useState(true)
useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid)
    })
}, [formState])
    return(
        <>
            <h1>PIZZA</h1>
            <form>
                <label htmlFor='name'>Name:
                    <input 
                        name='name'
                        type='text'
                    />
                </label>
                <br/>
                <label htmlFor='size'>Size:<br/>
                    <select name='size' id='positions'>
                        <option value='Itty Bitty'>Itty Bitty</option>
                        <option value='Not Big, Not Little'>Not Big, Not Little</option>
                        <option value='Chonk'>Chonk</option>
                        <option value='This Pizza Eats You Instead'>This Pizza Eats You Instead</option>
                    </select>
                </label>
                <br/>
                <label htmlFor='toppings'>Toppings:<br/>
                    <label>Pineapple
                        <input name='pineapple' type='checkbox'/>
                    </label>
                    <br/>
                    <label>Jalapenos
                        <input name='jalanpenos' type='checkbox'/>
                    </label>
                    <br/>
                    <label>Sauerkraut
                        <input name='sauerkraut' type='checkbox'/>
                    </label>
                    <br/>
                    <label>Garlic
                        <input name='garlic' type='checkbox'/>
                    </label>
                    <br/>
                </label>
                <br/>
                <label htmlFor='instructions'>Special Instructions:<br/>
                    <textarea name='instructions'/>
                </label>
                <br/>
                <button data-cy='submit' disabled={buttonDisabled}>
                    Add to Order
                </button>
            </form>
        </>
    )
}

export default Form