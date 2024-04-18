import {useSelector} from "react-redux";

const LoggedOut = ({children}) => {
    const user = useSelector(state => state.auth.userData);

    if (user) {
        return ;
    }

    return <div id="signed-out">
        {children}
    </div>
}

export default LoggedOut;

