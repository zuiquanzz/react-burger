import {ChangeEvent, useState} from "react";

export const useForm = (inputValues={}) => {
  const [values, setValues] = useState(inputValues);
  const [formChanged, setFormChanged] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setFormChanged(true)
  };
  return {values, handleChange, setValues, formChanged, setFormChanged};
}