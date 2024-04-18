import React from 'react';
import {CommonLoading} from "../loader/CommonLoading.jsx";

const FallBackLoading = () => {

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CommonLoading />
        </div>
    );
}

export default FallBackLoading;
