import React from 'react';
import {GoogleSignIn} from "../GoogleSignIn.jsx";
import {Result} from "antd";

const SignInPage = () => {

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                status="403"
                title="Please login to access this page."
                extra={<GoogleSignIn />}
            />
        </div>
    );
}

export default SignInPage;
