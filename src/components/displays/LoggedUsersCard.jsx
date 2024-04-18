import {Avatar, Badge, Button, Card, Select, Skeleton} from "antd";
import {ROLE_ENUM} from "../types/roleTypes.js";
import {getRoleDisplay} from "../utils/utils.js";
import {PoweroffOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {updateRole, updateUserActiveStatus} from "../../redux/actions/userActions.js";


export const LoggedUsersCard = ({ user }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user);
    return (
        <Skeleton loading={loading} avatar active>
        <Card
            style={{ width: '100%', marginTop: 16, padding: 22 }}
            actions={[
                <Select
                    key={`select-${user.id}`}
                    defaultValue={user.role_name}
                    style={{ width: '90%' }}
                    onChange={newRole => dispatch(updateRole(user.id, newRole))}
                    variant={'borderless'}
                >
                    {Object.values(ROLE_ENUM).map(role => (
                        <Select.Option key={role.name} value={role.name}>{getRoleDisplay(role.name)}</Select.Option>
                    ))}
                </Select>,
                    <Button
                        key={`button-${user.id}`}
                        type={user.active ? "primary" : "default"}
                        icon={<PoweroffOutlined />}
                        onClick={() => dispatch(updateUserActiveStatus(user.id, !user.active))}
                    >
                        {user.active ? "Enabled" : "Disabled"}
                    </Button>
            ]}
        >
            <Card.Meta
                avatar={
                    <Badge dot={true} offset={[-6, 37]} color={user.active ? 'green' : 'gray'}>
                        <Avatar
                            size={44}
                            src={user.avatar_url || ''}
                            alt="Avatar"
                        />
                    </Badge>
                }
                title={<a>{`${user.first_name || ''} ${user.last_name || ''}`}</a>}
                description={user.email}
            />
        </Card>
        </Skeleton>
    );
};