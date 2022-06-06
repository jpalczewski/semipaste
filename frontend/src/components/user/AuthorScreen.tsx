import {useNavigate, useParams} from "react-router-dom";
import {useLazyLoadQuery} from "react-relay";
import {getUserQuery} from "../../Query/Users/__generated__/getUserQuery.graphql";
import {getUser} from "../../Query/Users/getUser";
import {Button} from "react-bootstrap";
import {Wrapper} from "../../styles/Components.style";
import {UserReportScreen} from "./UserReportScreen";

export const AuthorScreen = () => {
    const {id} = useParams();
    const user = useLazyLoadQuery<getUserQuery>(getUser, {id: id!});
    const navigate = useNavigate();

    return (
        <Wrapper style={{textAlign: "left"}}>
            <div className="container p-3 bg-white">
            <div className="row mt-3 mb-5 w-25">
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
            <div className="row">
                <div className="col">
                    <h2>{user.allUsers?.edges?.[0]?.node?.username}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">{user.allUsers?.edges?.[0]?.node?.firstName}</div>
                <div className="col">{user.allUsers?.edges?.[0]?.node?.lastName}</div>
            </div>
            <div className="row">
                <div className="col">{user.allUsers?.edges?.[0]?.node?.dateJoined.slice(0, 10)}</div>
            </div>
                <div>
                <UserReportScreen
                    id={user.allUsers?.edges?.[0]?.node?.id}
                    username={user.allUsers?.edges?.[0]?.node?.username}
                />
            </div>
        </div>
        </Wrapper>
    )
}