import {useState} from "react";

export const useForm = ( initialState )=>{
    /*Es un excelente Custom Hooks. DEBO APRENDER*/
    /*Nos retorna la función para cambiar el state. Además, el setSTate obtiene el nombre
    del argumento 'name' y lo cambia. Por eso el targe. Del targer extraemos el nombre y el value*/
    const [ formState, setFormState ] = useState(initialState);

    const reset = () =>{
        setFormState(initialState);
    }
    const handleInputChange = ({target}) =>{
        setFormState({
            ...formState,
            [target.name] : target.value
        });
    }
    
    return [formState, handleInputChange, reset];
}