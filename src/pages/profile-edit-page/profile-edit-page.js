import styles from "./profile-edit-page.module.css";
import {Input, Box, EditIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserByToken} from '../../services/authorization/actions';
import {getUser} from "../../services/selectors";


export const ProfileEditPage = () => {
    const {name, email, password} = useSelector(getUser);


    const [value, setValue] = useState(name);
    const [valueP, setValueP] = useState('');
    const [valueM, setValueM] = useState(email);

    const inputRefName = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const token = localStorage.getItem('accessToken');
    const dispatch = useDispatch();

    const onIconClickName = () => {
        setTimeout(() => inputRefName.current.focus(), 0)

    }
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current.focus(), 0)
    }

    const onIconClickPassword = () => {
        setTimeout(() => inputRefPassword.current.focus(), 0)
    }

    let display = 'none';
    if (value !== name || valueM !== email) {
        display = 'block';
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (valueP !== '') {
            dispatch(editUserByToken(value, valueM, valueP, token))
        } else {
            dispatch(editUserByToken(value, valueM, password, token))
        }
    }

    const handleReset = () => {
        setValue(name);
        setValueM(email);
        setValueP('');
    }

    return (
        <>
            <form onSubmit={handleEdit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    icon={'EditIcon'}
                    ref={inputRefName}
                    onIconClick={onIconClickName}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    value={value}
                />
                <Input
                    type={'text'}
                    placeholder={'Email'}
                    onChange={e => setValueM(e.target.value)}
                    icon={'EditIcon'}
                    ref={inputRefEmail}
                    onIconClick={onIconClickEmail}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={valueM}
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'EditIcon'}
                    onChange={e => setValueP(e.target.value)}
                    ref={inputRefPassword}
                    onIconClick={onIconClickPassword}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={valueP}
                />

                <div className={`${styles.hidden_button} mt-6`} style={{display}}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                    <Button htmlType="reset" type="primary" size="medium" extraClass="ml-6" onClick={handleReset}>
                        Отмена
                    </Button>
                </div>
            </form>
        </>
    )
}