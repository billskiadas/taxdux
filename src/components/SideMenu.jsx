import { Menu } from 'antd';
import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        {
            key: '/groups',
            icon: <TeamOutlined />,
            label: 'Groups',
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: 'Users',
        },
    ];
    const handleMenuClick = (e) => {
        navigate(e.key);
    };
    return (
        <Menu
            theme="dark"
            mode="inline"
            onClick={handleMenuClick}
            items={items}
            selectedKeys={[location.pathname]}
        />
    );
};

export default SideMenu;
