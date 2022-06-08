import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import "./App.css";
import { Routerr } from "./navigation/Router";
import RelayEnvironment from "./RelayEnvironment";
import {Flex, Spinner} from "@chakra-ui/react";

const token = JSON.parse(localStorage.getItem("token")!);
const username = JSON.parse(localStorage.getItem("username")!);
export const UserContext = React.createContext({token: token, username: username});

const App: React.FC = () => {
    return (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
            <UserContext.Provider value={{token: token, username: username}}>
                <Suspense fallback={
                    <Flex style={{height: "100vh"}} className="d-flex justify-content-center align-items-center">
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex>
                }>
                    <Routerr/>
                </Suspense>
            </UserContext.Provider>
        </RelayEnvironmentProvider>
    );
};

export default App;
