import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserByToken} from '../../services/authorization/actions';
import {getUser} from "../../services/selectors";


export const ProfileEditPage = () => {
    const {name, email, password} = useSelector(getUser);


    const [valueName, setValueName] = useState(name);
    const [valuePassword, setValuePassword] = useState('');
    const [valueEmail, setValueEmail] = useState(email);
    const [valueChanged, setValueChanged] = useState(false);


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

    const handleEdit = (e) => {
        e.preventDefault();
        if (valuePassword !== '') {
            dispatch(editUserByToken(valueName, valueEmail, valuePassword, token))
        } else {
            dispatch(editUserByToken(valueName, valueEmail, password, token))
        }
    }

    const handleReset = () => {
        setValueName(name);
        setValueEmail(email);
        setValuePassword('');
        setValueChanged(false);
    }

    return (
        <>
            <form onSubmit={handleEdit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => {
                        setValueName(e.target.value)
                        setValueChanged(true)
                    }}
                    icon={'EditIcon'}
                    ref={inputRefName}
                    onIconClick={onIconClickName}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    value={valueName}
                />
                <Input
                    type={'text'}
                    placeholder={'Email'}
                    onChange={e => {
                        setValueEmail(e.target.value)
                        setValueChanged(true)
                    }}
                    icon={'EditIcon'}
                    ref={inputRefEmail}
                    onIconClick={onIconClickEmail}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={valueEmail}
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'EditIcon'}
                    onChange={e => {
                        setValuePassword(e.target.value)
                        setValueChanged(true)
                    }}
                    ref={inputRefPassword}
                    onIconClick={onIconClickPassword}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={valuePassword}
                />

                {valueChanged &&
                    <div className="mt-6">
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                        <Button htmlType="reset" type="primary" size="medium" extraClass="ml-6" onClick={handleReset}>
                            Отмена
                        </Button>
                    </div>
                }
            </form>
        </>
    )
}