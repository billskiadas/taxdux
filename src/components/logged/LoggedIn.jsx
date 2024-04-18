import {useSelector} from "react-redux";

const LoggedIn = ({children}) => {

    const user = useSelector(state => state.auth.userData);

    if (!user) {
        return <div></div>;
    }

    return <div id="signed-in">
        {children}
    </div>
}

export default LoggedIn;

