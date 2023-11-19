import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {SyntheticEvent, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUserByToken} from '../../services/authorization/actions';
import {getUser} from "../../services/selectors";
import {useForm} from "../../hooks/use-form";


export const ProfileEditPage = () => {
    const userName = useSelector(getUser).name;
    const userEmail = useSelector(getUser).email;


    const {values, handleChange, formChanged, setFormChanged, setValues} = useForm({name: userName, email: userEmail, password: ''})
    const {name, email, password} = values;


    const inputRefName = useRef<HTMLInputElement>(null);
    const inputRefEmail = useRef<HTMLInputElement>(null);
    const inputRefPassword = useRef<HTMLInputElement>(null);

    const token = localStorage.getItem('accessToken');
    const dispatch = useDispatch();

    const onIconClickName = () => {
        setTimeout(() => inputRefName.current!.focus(), 0)

    }
    const onIconClickEmail = () => {
        setTimeout(() => inputRefEmail.current!.focus(), 0)
    }

    const onIconClickPassword = () => {
        setTimeout(() => inputRefPassword.current!.focus(), 0)
    }

    const handleEdit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (password !== '') {
            dispatch<any>(editUserByToken(name, email, password, token))
        } else {
            dispatch<any>(editUserByToken(name, email, password, token))
        }
    }

    const handleReset = () => {
        setValues({name: name, email: email, password: ''})
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
                    value={name || ''}
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
                    value={email || ''}
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
                    value={password || ''}
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