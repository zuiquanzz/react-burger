import styles from "./forgot-password.module.css";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {FormEvent, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getForgotPassword} from "../../services/authorization/actions";
import {useDispatch, useSelector} from "../../types/types";
import {getAuth} from "../../services/selectors";
import {useForm} from "../../hooks/use-form";


export const ForgotPassword = () => {

    const {values, handleChange} = useForm({email: ''})
    const email = values.email;

    const dispatch = useDispatch();

    const {forgotPassword} = useSelector(getAuth)

    const navigate = useNavigate();

    useEffect(() => {
        if (forgotPassword === 'Reset email sent') {
            navigate('/reset-password');
        }
    }, [dispatch]);

    const handleForgotPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email !== '') {
            //@ts-ignore
            dispatch<any>(getForgotPassword(email))
        }
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.head}>Восстановление пароля</div>
                <form onSubmit={handleForgotPassword}>
                    <Input
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        onChange={handleChange}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={email || ''}
                    />
                    <div className={`${styles.button} mt-6`}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Восстановить
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