import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import "./App.css";

import { Routerr } from "./navigation/Router";
import RelayEnvironment from "./RelayEnvironment";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<h1>trwa formatowanie dysku twardego</h1>}>
          <Routerr />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default App;
