import {Route, Routes} from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page";
import AppHeader from "../app-header/app-header";
import {ProfilePage} from "../../pages/profile-page/profile-page";
import {SignInPage} from "../../pages/sign-in-page/sign-in-page";
import {getAuth} from "../../services/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAuthLogin, getAuthRegister, getUserSession} from "../../services/authorization/actions";
import {ProtectedRoutes} from "../../services/protected-routes/protected-routes";
import appStyles from "./app.module.css";
import {ProfileEditPage} from "../../pages/profile-edit-page/profile-edit-page";
import {OrdersPage} from "../../pages/orders-page/orders-page";


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