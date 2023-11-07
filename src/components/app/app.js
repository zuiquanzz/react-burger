import {Route, Routes} from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page";
import AppHeader from "../app-header/app-header";
import {ProfilePage} from "../../pages/profile-page/profile-page";
import {SignInPage} from "../../pages/sign-in-page/sign-in-page";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUserSession} from "../../services/authorization/actions";
import {ProtectedRoutes} from "../../services/protected-routes/protected-routes";
import appStyles from "./app.module.css";
import {ProfileEditPage} from "../../pages/profile-edit-page/profile-edit-page";
import {OrdersPage} from "../../pages/orders-page/orders-page";
import {RegistrationPage} from "../../pages/registration-page/registration-page";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserSession());
    }, [dispatch])

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/register' element={<ProtectedRoutes onlyUnAuth page={<RegistrationPage/>}/>}/>
                <Route path='/forgot-password' element={<ProtectedRoutes onlyUnAuth page={<ForgotPassword/>}/>} />
                <Route path='/reset-password' element={<ProtectedRoutes onlyUnAuth page={<ResetPassword/>}/>} />
                <Route path='/profile' element={<ProtectedRoutes page={<ProfilePage/>}/>}>
                    <Route index element={<ProtectedRoutes page={<ProfileEditPage/>}/>}/>
                    <Route path='orders' element={<ProtectedRoutes page={<OrdersPage/>}/>}/>
                </Route>
                <Route path='/sign-in' element={<ProtectedRoutes onlyUnAuth page={<SignInPage/>}/>}/>
            </Routes>
        </div>
    )
}

export default App;