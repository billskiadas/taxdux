import {useMemo, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../redux/actions/authActions.js";
import logo from "../assets/logo6.webp";
import SideMenu from "./SideMenu.jsx";
import {Divider, Layout} from "antd";
import HeaderLoggedIn from "./HeaderLoggedIn.jsx";
import DownMobileMenu from "../DownMobileMenu.jsx";
import {SearchProvider} from "../hooks/useSearch.jsx";
import {GoogleSignIn} from "./GoogleSignIn.jsx";

const { Content, Footer, Sider, Header } = Layout;
const PrivateRoute = ({ userData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("access_token");

    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);


    useEffect(() => {
        if (!isAuthenticated(userData, accessToken)) {
            dispatch(logoutUser);
            navigate("/signin");
        }
    }, [dispatch, navigate, userData, accessToken, isAuthenticated]);


    return <Layout style={{minHeight: '100vh'}}>
        <Sider className='responsive'>
            <div style={{display: 'flex', alignItems: 'center', color: 'white smoke', justifyContent: 'space-around'}}>
                <img src={logo} style={{maxWidth: '100%', marginBottom: -20}} alt="Logo"/>
            </div>
            {isAuthenticated(userData, accessToken)? <SideMenu/> : <></>}
        </Sider>
        <Layout>
            <SearchProvider>
                <Header style={{background: 'whitesmoke'}}>
                    { isAuthenticated(userData, accessToken)? <HeaderLoggedIn/> : <GoogleSignIn /> }
                </Header>
                <Divider/>
                <Content style={{margin: '0 16px'}}>
                    {isAuthenticated(userData, accessToken) ? <Outlet/> : <></>}
                </Content>
            </SearchProvider>
            <Footer className='responsive' style={{ textAlign: 'center', maxHeight: '10vh' }}>TaxPass ©2024 Created by 🐱😽</Footer>
            <Footer className='mobile-responsive'><DownMobileMenu /></Footer>
        </Layout>
    </Layout>

}

export default PrivateRoute;
