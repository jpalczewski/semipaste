import {Container, Row} from "react-bootstrap";
import {Box} from "@chakra-ui/react";
import {useLazyLoadQuery} from "react-relay";
import {newPastesBinQuery} from "../../Query/PasteBins/__generated__/newPastesBinQuery.graphql";
import {newPastesBin} from "../../Query/PasteBins/newPastesBin";

export const DashboardHomeScreen = () => {
    let format = "";
    const date = new Date();
    format += date.getFullYear() + "-";
    if (date.getMonth() < 10) {
        format += "0" + date.getMonth() + "-";
    }
    else {
        format += date.getMonth() + "-";
    }

    if (date.getDay() < 10) {
        format += "0" + date.getDay();
    }
    else {
        format += date.getDay();
    }

    const totalCount = useLazyLoadQuery<newPastesBinQuery>(newPastesBin, {dateOfExpiry_Gte: format})

    return (
        <Container style={{marginTop: "25px"}}>
            <Row>
                <h1>Home</h1>
                <Box>
                    New Pastes today:
                </Box>
                <Box>
                    {totalCount.activePasteBin?.totalCount}
                </Box>
            </Row>
        </Container>
    )
};
