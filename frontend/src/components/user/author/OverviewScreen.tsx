import {Box} from "@chakra-ui/react";
import {Col, Row} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import {threeRecentPasteBinQuery} from "../../../Query/PasteBins/__generated__/threeRecentPasteBinQuery.graphql";
import {threeRecentPasteBin} from "../../../Query/PasteBins/threeRecentPasteBin";
import {threePopularPasteBinQuery} from "../../../Query/PasteBins/__generated__/threePopularPasteBinQuery.graphql";
import {threePopularPasteBin} from "../../../Query/PasteBins/threePopularPasteBin";
import {useNavigate} from "react-router-dom";

export const OverviewScreen = (user: any) => {
    const recent_pastes = useLazyLoadQuery<threeRecentPasteBinQuery>(threeRecentPasteBin, {author__Username: user.username});
    const popular_pastes = useLazyLoadQuery<threePopularPasteBinQuery>(threePopularPasteBin, {author__Username: user.username});
    const navigate = useNavigate();
    return (
        <>
            <Row>
                <Box className="p-3 border-1">
                    <p>{user.firstName !== "" ? user.firstName : "X"}
                        {" "}
                        {user.lastName !== "" ? user.lastName : "X"}</p>
                    <br/>
                    <p>{user.description !== "" ? user.description : "No description"}</p>
                </Box>
            </Row>
            <Row className="mt-4">
                <Box className="border-1">
                    <p className="mb-4">Recent Pastes</p>
                    {recent_pastes.activePasteBin?.edges?.map((element: any, i: number) => {
                        return (
                            <Row>
                                <Col onClick={() => navigate(`/pastes/${recent_pastes.activePasteBin?.edges[i]?.node?.id}`)}>
                                    {recent_pastes.activePasteBin?.edges[i]?.node?.title}
                                </Col>
                                <Col>
                                    {recent_pastes.activePasteBin?.edges[i]?.node?.dateOfCreation.slice(0, 10)}
                                </Col>
                                <Col>
                                    {recent_pastes.activePasteBin?.edges[i]?.node?.totalRating}
                                </Col>
                            </Row>
                        )
                    })}
                </Box>
            </Row>
            <Row className="mt-4">
                <Box className="border-1">
                    <p className="mb-4">Popular Pastes</p>
                    {popular_pastes.activePasteBin?.edges?.map((element: any, i: number) => {
                        return (
                            <Row>
                                <Col onClick={() => navigate(`/pastes/${popular_pastes.activePasteBin?.edges[i]?.node?.id}`)}>
                                    {popular_pastes.activePasteBin?.edges[i]?.node?.title}
                                </Col>
                                <Col>
                                    {popular_pastes.activePasteBin?.edges[i]?.node?.dateOfCreation.slice(0, 10)}
                                </Col>
                                <Col>
                                    {popular_pastes.activePasteBin?.edges[i]?.node?.totalRating}
                                </Col>
                            </Row>
                        )
                    })}
                </Box>
            </Row>
        </>
    );
}
