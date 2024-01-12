import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getAuth} from "../selectors";
import {FC, ReactElement} from "react";
import {Loader} from "../../utils/loader/loader";

interface IProtectedRouteProps  {
    onlyUnAuth: boolean;
    page: ReactElement;
}

export const ProtectedRoutes:FC<IProtectedRouteProps> = ({onlyUnAuth = false, page}) => {
    const {
        user,
        isLoading,
    } = useSelector(getAuth)

    const location = useLocation();

    if (isLoading) {
        return (
            <>
                <Loader size='large'/>
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




