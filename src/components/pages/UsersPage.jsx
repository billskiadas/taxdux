import {Table, Avatar, Switch, Select, Badge} from 'antd';
import {getRoleDisplay} from "../utils/utils.js";
import {ROLE_ENUM} from "../types/roleTypes.js";
import moment from "moment";
import {LoggedInUsersCardList} from "../displays/LoggedInUsersCardList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProfiles, updateRole, updateUserActiveStatus} from "../../redux/actions/userActions.js";

const UsersPage = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector(state => state.user);
    const { id } = useSelector(state => state.auth.userData);


    useEffect(() => {
        dispatch(fetchProfiles(id));
    }, [dispatch]);

    const columns = [
        {
            title: '',
            render: (_, user) =>
                <Badge dot={'left'} offset={[-6,37]} size={'default'} color={user?.active?'green':'gray'}>
                    <Avatar
                        size={44}
                        src={user?.avatar_url || ''}
                        alt="Avatar"
                    />
                </Badge>
        },
        {
            title: 'Name',
            key: 'name',
            render: (_, user) => <a>{`${user?.first_name || ''} ${user?.last_name || ''}`}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
            key: 'role',
            render: (role, user) => (
                <Select
                    defaultValue={role}
                    variant={'borderless'}
                    style={{ width: '90%' }}
                    onChange={newRole =>
                        dispatch(updateRole(user.id, newRole))}
                >
                    {Object.values(ROLE_ENUM).map(role => (
                        <Select.Option key={role.name} value={role.name}>{getRoleDisplay(role.name)}</Select.Option>
                    ))}
                </Select>)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Signed Up',
            dataIndex: 'created_at',
            key: 'signedUp',
            render: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
        },
        {
            title: 'Active',
            key: 'active',
            dataIndex: 'active',
            render: (active, user) => (
                <Switch
                    size="small"
                    checked={active}
                    onChange={(checked) =>
                        dispatch(updateUserActiveStatus(user.id, checked))
                    }
                />
            ),
        }
    ];

    return (
        <>
            <Table
                rowKey={record => record.user_id} // Use a unique identifier from your data
                columns={columns}
                dataSource={profiles}
                loading={loading}
                className={'responsive'}
                pagination={false}
            />

            <LoggedInUsersCardList
                users={profiles}/>

        </>
    );
}

export default UsersPage;