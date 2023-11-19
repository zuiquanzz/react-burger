import {ChangeEvent, useState} from "react";

interface IFormValues {
    name?: string;
    password?: string;
    email?: string;
    confirmCode?: string;
}

export const useForm = (inputValues: IFormValues) => {
    const [values, setValues] = useState(inputValues);
    const [formChanged, setFormChanged] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
        setFormChanged(true)
    };
    return {values, handleChange, setValues, formChanged, setFormChanged};
}