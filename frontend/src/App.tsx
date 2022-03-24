import React, { Suspense } from "react";
import { Popover } from "react-bootstrap";
import { RelayEnvironmentProvider } from "react-relay";
import "./App.css";
import { Popular } from "./components/PopularScreen";
import { Routerr } from "./navigation/Router";
import RelayEnvironment from "./RelayEnvironment";

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<h1>trwa formatowanie dysku twardego</h1>} >
      <Routerr />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default App;
