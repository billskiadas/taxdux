import { Avatar, Input } from 'antd';
import { useSearch } from '../hooks/useSearch';
import { useSelector } from "react-redux";
import { SignOutButton } from "./SignOutButton.jsx";
import { SearchOutlined } from "@ant-design/icons";
import { getRoleDisplay, hasElevatedAccess } from "./utils/utils.js";

const HeaderLoggedIn = () => {

    const { searchText, setSearchText } = useSearch();
    const user = useSelector(state => state.auth.userData)
    const roles = useSelector(state => state.auth.role)

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };



    return (<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
        <div/>
        {
            hasElevatedAccess(roles)?
                <Input
                    placeholder="Search"
                    allowClear
                    value={searchText}
                    suffix={<SearchOutlined />}
                    onChange={handleSearch}
                    style={{ maxWidth:500, borderRadius: '15px',lineHeight:2 }} />
                :
                <div/>
        }
        <div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div className='user-detail-responsive' style={{display:'flex',flexDirection:'column', lineHeight:0.5,textAlign:'right',marginTop:7, whiteSpace:'nowrap'}}>
                    <b>{user?.user_metadata?.name}</b>
                    <p>{roles.length > 0 && getRoleDisplay(roles)}</p>
                </div>
                <div style={{ height: '50px', borderLeft: '2px solid #d5d5d5', margin: '0 10px' }}></div>
                <Avatar
                    size={44}
                    src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture}
                    alt="Avatar"
                />
                <SignOutButton />
            </div>
        </div>
    </div>)

}

export default HeaderLoggedIn;

