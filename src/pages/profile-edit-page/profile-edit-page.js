import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserByToken} from '../../services/authorization/actions';
import {getUser} from "../../services/selectors";
import {useForm} from "../../hooks/use-form";


export const ProfileEditPage = () => {
    const {name, email, password} = useSelector(getUser);


    const {values, handleChange, formChanged, setFormChanged, setValues} = useForm({profileName: name, profileEmail: email, profilePassword: ''})
    const {profileName, profileEmail, profilePassword} = values;


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
        if (profilePassword !== '') {
            dispatch(editUserByToken(profileName, profileEmail, profilePassword, token))
        } else {
            dispatch(editUserByToken(profileName, profileEmail, password, token))
        }
    }

    const handleReset = () => {
        setValues({profileName: name, profileEmail: email, profilePassword: ''})
        setFormChanged(false)
    }

    return (
        <>
            <form onSubmit={handleEdit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    icon={'EditIcon'}
                    ref={inputRefName}
                    onIconClick={onIconClickName}
                    name={'profileName'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    value={profileName}
                />
                <Input
                    type={'text'}
                    placeholder={'Email'}
                    onChange={handleChange}
                    icon={'EditIcon'}
                    ref={inputRefEmail}
                    onIconClick={onIconClickEmail}
                    name={'profileEmail'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={profileEmail}
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'EditIcon'}
                    onChange={handleChange}
                    ref={inputRefPassword}
                    onIconClick={onIconClickPassword}
                    name={'profilePassword'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                    value={profilePassword}
                />

                {formChanged &&
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