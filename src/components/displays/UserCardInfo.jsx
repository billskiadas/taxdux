import { useState } from 'react';
import { Row, Button, Card, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import NameAvatar from "./NameAvatar.jsx";

const UserInfoList = ({ name, email, password }) => {
    const [showButtons, setShowButtons] = useState(false);

    const handleToggleButtons = () => {
        setShowButtons(!showButtons);
    };

    const containerStyle = {
        position: 'relative',
        width: '100%',
    };

    const cardStyle = {
        transform: showButtons ? 'translateX(-73px)' : 'translateX(0)',
        transition: 'transform 0.3s ease',
        position: 'relative',
        zIndex: 2,
    };

    const buttonsStyle = {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translateY(-50%)',
        gap: 3,
        zIndex: 1
    };

    return (
        <div style={containerStyle}>
            <Card className="custom-card" style={cardStyle}>
                <Row justify="space-between" align="middle" wrap={false}>
                    <div className='logo-container'>
                        <NameAvatar fullName={name} />
                    </div>
                    <div className="content">
                        <div className="title">{name}</div>
                        <div className="email">{email}</div>
                        <div className="password">{'*'.repeat(password?.length || 0)}</div>
                    </div>
                    <Button shape="circle" icon={<ArrowRightIcon className="arrow-icon" />} onClick={handleToggleButtons} />
                </Row>
            </Card>
            <Row style={buttonsStyle} justify="start" align="middle">
                <Col>
                    <   Button shape="circle" icon={<EditOutlined />} style={{ background: 'black', color: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Col>
                <Col>
                    <Button shape="circle" icon={<DeleteOutlined />} danger style={{ background: '#ff4d4f', color: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Col>
            </Row>
        </div>
    );
};

function ArrowRightIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}

export default UserInfoList;