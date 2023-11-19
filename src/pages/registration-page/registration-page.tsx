import styles from "./registration-page.module.css";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {SyntheticEvent, useRef} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getAuthRegister} from '../../services/authorization/actions';
import {useForm} from "../../hooks/use-form";


export const RegistrationPage = () => {

    const {values, handleChange} = useForm({name: '', email: '', password: ''})
    const name = values.name;
    const email = values.email;
    const password = values.password;

    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch();

    const onIconClick = () => {
        setTimeout(() => inputRef.current!.focus(), 0)
        inputRef.current!.type === 'text' ? inputRef.current!.type = 'password' : inputRef.current!.type = 'text'
    }

    const handleRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        if (name !== '' && email !== '' && password !== '') {
            dispatch<any>(getAuthRegister(name, email, password))
        }
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.header}>Регистрация</div>
                <form onSubmit={handleRegister}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={name || ''}
                    />
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={handleChange}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={email || ''}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        icon={'ShowIcon'}
                        onChange={handleChange}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={password || ''}
                    />
                    <div className={`${styles.button} mt-6`}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <div className={`${styles.register} mt-10`}>
                    <p className={`${styles.text} `}>Уже зарегистрированы?</p>
                    <Link to='/sign-in' className={styles.link}>
                        <p className={`${styles.link} ml-2`}>Войти</p>
                    </Link>
                </div>
            </div>
        </>
    )
}