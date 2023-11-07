import styles from "./forgot-password.module.css";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getForgotPassword} from "../../services/authorization/actions";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../../services/selectors";


export const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const {forgotPassword} = useSelector(getAuth)

    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (email !== '') {
            dispatch(getForgotPassword(email))
        }
        if (forgotPassword === 'Reset email sent') {
            navigate('/reset-password')
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
                        onChange={e => setEmail(e.target.value)}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                        value={email}
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