import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getAuth} from "../selectors";

export const ProtectedRoutes = ({onlyUnAuth = false, page}) => {
    const {
        user,
        isLoading,
    } = useSelector(getAuth)

    const location = useLocation();

    if (isLoading) {
        return (
            <>
                <p>Загрузка..</p>
            </>);
    }

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: "/"}};
        return <Navigate to={from}/>;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/sign-in" state={{from: location}}/>;
    }
    return page;
};




