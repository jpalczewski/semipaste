import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import "./App.css";
import { Routerr } from "./navigation/Router";
import RelayEnvironment from "./RelayEnvironment";

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Routerr />
    </RelayEnvironmentProvider>
  );
};

export default App;
