import styles from "./reset-password.module.css";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../../services/selectors";
import {getResetPassword} from "../../services/authorization/actions";


export const ResetPassword = () => {

    const dispatch = useDispatch();

    const {forgotPassword} = useSelector(getAuth)

    const navigate = useNavigate();

    useEffect(() => {
        if (!forgotPassword) {
            navigate('/');
        }
    }, []);


    const [valueNewPass, setValueNewPass] = useState('');
    const [valueConfirmCode, setValueConfirmCode] = useState('');

    const inputRef = useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        inputRef.current.type === 'text' ? inputRef.current.type = 'password' : inputRef.current.type = 'text'
    }

    const resetPassword = (e) => {
        e.preventDefault();
        if (valueNewPass !== '' && valueConfirmCode !== '') {
            dispatch(getResetPassword(valueNewPass, valueConfirmCode))
            if (!forgotPassword) {
                navigate('/');
            }
        }
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.headling}>Восстановление пароля</div>
                <form onSubmit={resetPassword}>
                    <Input
                        type={'text'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setValueNewPass(e.target.value)}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        ref={inputRef}
                        icon={'ShowIcon'}
                        onIconClick={onIconClick}
                        value={valueNewPass}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValueConfirmCode(e.target.value)}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={valueConfirmCode}
                    />
                    <div className={`${styles.button} mt-6`}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
                <div className={`${styles.register} mt-20`}>
                    <p className={`${styles.text} `}>Вспомнили пароль?</p>
                    <Link to='/sign-in' className={styles.link}>
                        <p className={`${styles.link} ml-2`}>Войти</p>
                    </Link>
                </div>
            </div>
        </>
    )
}