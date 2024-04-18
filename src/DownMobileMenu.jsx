import { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";

const DownMenu = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            onClick={handleMenuClick}
            selectedKeys={[location.pathname]}
            className='down-menu'
            style={{ display:'flex',  textAlign:'center', alignItems:'center' }}
        >
            <Menu.Item key="/" ><HomeOutlined /></Menu.Item>
            <Menu.Item key="/groups" ><TeamOutlined /></Menu.Item>
            <Menu.Item key="/users" ><UserOutlined /></Menu.Item>
        </Menu>
    );
};

export default DownMenu;
