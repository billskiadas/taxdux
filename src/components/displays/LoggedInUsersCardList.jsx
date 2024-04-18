import {Col, Row} from "antd";
import {LoggedUsersCard} from "./LoggedUsersCard.jsx";
import {useSelector} from "react-redux";

export const LoggedInUsersCardList = () => {
    const { profiles } = useSelector(state => state.user);


    return <Row
        gutter={16}
        style={{ margin: 0, width: '100%' }}
        className={'mobile-responsive'}>
        {
            profiles?.map(profile =>
                (<Col
                    xs={24}
                    md={12}
                    key={profile.id}>
                    <LoggedUsersCard
                        user={profile} />
                </Col>))
        }
    </Row>
}