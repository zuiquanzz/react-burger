import styles from "./sign-in-page.module.css";
import { Input, Box, ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getAuthLogin} from "../../services/authorization/actions";


export const SignInPage = () => {

    const [value, setValue] = useState('');
    const [valueP, setValueP] = useState('');

    const inputRef = useRef(null)
    const dispatch = useDispatch();

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        inputRef.current.type === 'text' ? inputRef.current.type = 'password' : inputRef.current.type = 'text'
    }

    const loginCheck = (e) => {
        if (value !== '' && valueP !== '') {
            e.preventDefault();
            dispatch(getAuthLogin(value,valueP))
        }
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.head}>Вход</div>
                <form onSubmit={loginCheck}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={e => setValue(e.target.value)}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={value}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        icon={'ShowIcon'}
                        onChange={e => setValueP(e.target.value)}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={valueP}
                    />
                    <div className={`${styles.button} mt-6`}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
                <div className={`${styles.register} mt-20`}>
                    <p className={`${styles.text} `}>Новый пользователь?</p>
                    <Link to='/register' className={styles.link}>
                        <p className={`${styles.link} ml-2`}>Зарегистрироваться</p>
                    </Link>
                </div>
                <div className={`${styles.register} mt-2`}>
                    <p className={`${styles.text} `}>Забыли пароль?</p>
                    <Link to='/forgot-password' className={styles.link}>
                        <p className={`${styles.link} ml-2`}>Восстановить пароль</p>
                    </Link>
                </div>
            </div>
        </>
    )
}