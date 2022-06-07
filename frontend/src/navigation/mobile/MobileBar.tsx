import {
    Container,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import React from "react";
import {LeftMenu} from "./LeftMenu";
import {RightMenu} from "./RightMenu";

export const MobileBar = (props: any) => {
    return (
        <>
            <Container className="m-0 shadow-sm p-3 mw-100" style={{backgroundColor: "#313C40"}}>
                <Flex className="" align="center" style={{color: "white", fontSize: 24}}>
                    <LeftMenu token={props.token}/>
                    <Spacer/>
                    {props.token &&
                        <RightMenu username={props.username} logout={props.logout} account={props.account}/>}
                </Flex>
            </Container>
        </>
    );
}
