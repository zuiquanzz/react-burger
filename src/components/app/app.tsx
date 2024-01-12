import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page";
import AppHeader from "../app-header/app-header";
import {ProfilePage} from "../../pages/profile-page/profile-page";
import {SignInPage} from "../../pages/sign-in-page/sign-in-page";
import {useEffect} from "react";
import {getUserSession} from "../../services/authorization/actions";
import {ProtectedRoutes} from "../../services/protected-routes/protected-routes";
import {ProfileEditPage} from "../../pages/profile-edit-page/profile-edit-page";
import {RegistrationPage} from "../../pages/registration-page/registration-page";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/modal-content/ingredient-details/ingredient-details";
import {getAllIngredients} from "../../services/selectors";
import {getIngredients} from "../../services/ingredients/actions";
import {useDispatch, useSelector} from "../../types/types";
import {Feed} from "../../pages/feed/feed";
import {connect, disconnect} from "../../services/websocket/actions";
import {FeedId} from "../feed-id/feed-id";
import {ProfileOrders} from "../profile-orders/profile-orders";
import {Loader} from "../../utils/loader/loader";
import {urlWebSocket} from "../../utils/api";


const App = () => {

    const dispatch = useDispatch();
    const {isLoading} = useSelector(getAllIngredients)

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUserSession());
        dispatch(connect(urlWebSocket));
        return()=>{
            dispatch(disconnect());
        }
    }, [dispatch])

    if (!isLoading) {
        return (
            <>
                <AppHeader/>
                <Routes location={background || location}>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/register' element={<ProtectedRoutes onlyUnAuth={true} page={<RegistrationPage/>}/>}/>
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/feed/:feedId' element={<FeedId />} />
                    <Route path='/forgot-password' element={<ProtectedRoutes onlyUnAuth={true} page={<ForgotPassword/>}/>}/>
                    <Route path='/reset-password' element={<ProtectedRoutes onlyUnAuth={true} page={<ResetPassword/>}/>}/>
                    <Route path='/profile/orders/:orderId' element={<ProtectedRoutes onlyUnAuth={false} page={<FeedId/>}/>}/>
                    <Route path='/profile' element={<ProtectedRoutes onlyUnAuth={false} page={<ProfilePage/>}/>}>
                        <Route index element={<ProtectedRoutes onlyUnAuth={false} page={<ProfileEditPage/>}/>}/>
                        <Route path='orders' element={<ProtectedRoutes onlyUnAuth={false} page={<ProfileOrders/>}/>}/>
                    </Route>
                    <Route path='/ingredients/:ingredientId' element={<IngredientDetails/>}/>
                    <Route path='/sign-in' element={<ProtectedRoutes onlyUnAuth={true} page={<SignInPage/>}/>}/>
                </Routes>
                {background && (
                    <Routes>
                        <Route path='/feed/:feedId' element={
                            <Modal modalClose={handleModalClose}>
                                <FeedId />
                            </Modal>}
                        />
                        <Route path='/profile/orders/:orderId' element={
                            <Modal modalClose={handleModalClose}>
                                <FeedId />
                            </Modal>}
                        />
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
            </>
        )
    } else {
        return <Loader size='large'/>
    }
}

export default App