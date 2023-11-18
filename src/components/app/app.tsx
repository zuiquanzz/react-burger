import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page";
import AppHeader from "../app-header/app-header";
import {ProfilePage} from "../../pages/profile-page/profile-page";
import {SignInPage} from "../../pages/sign-in-page/sign-in-page";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserSession} from "../../services/authorization/actions";
import {ProtectedRoutes} from "../../services/protected-routes/protected-routes";
import appStyles from "./app.module.css";
import {ProfileEditPage} from "../../pages/profile-edit-page/profile-edit-page";
import {OrdersPage} from "../../pages/orders-page/orders-page";
import {RegistrationPage} from "../../pages/registration-page/registration-page";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/modal-content/ingredient-details/ingredient-details";
import {getAllIngredients} from "../../services/selectors";
import {getIngredients} from "../../services/ingredients/actions";


const App = () => {

    const dispatch = useDispatch();
    const {ingredients} = useSelector(getAllIngredients)

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch<any>(getIngredients());
        dispatch<any>(getUserSession());
    }, [dispatch])

    if (ingredients.length > 0) {
        return (
            <div className={appStyles.app}>
                <AppHeader/>
                <Routes location={background || location}>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/register' element={<ProtectedRoutes onlyUnAuth page={<RegistrationPage/>}/>}/>
                    <Route path='/forgot-password' element={<ProtectedRoutes onlyUnAuth page={<ForgotPassword/>}/>}/>
                    <Route path='/reset-password' element={<ProtectedRoutes onlyUnAuth page={<ResetPassword/>}/>}/>
                    <Route path='/profile' element={<ProtectedRoutes page={<ProfilePage/>}/>}>
                        <Route index element={<ProtectedRoutes page={<ProfileEditPage/>}/>}/>
                        <Route path='orders' element={<ProtectedRoutes page={<OrdersPage/>}/>}/>
                    </Route>
                    <Route path='/ingredients/:ingredientId' element={<IngredientDetails/>}/>
                    <Route path='/sign-in' element={<ProtectedRoutes onlyUnAuth page={<SignInPage/>}/>}/>
                </Routes>
                {background && (
                    <Routes>
                        <Route
                            path='/ingredients/:ingredientId'
                            element={
                                <Modal modalClose={handleModalClose}>
                                    <IngredientDetails/>
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </div>
        )
    }
}

export default App;