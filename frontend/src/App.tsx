import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import "./App.css";
import { Routerr } from "./navigation/Router";
import RelayEnvironment from "./RelayEnvironment";



const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<h1>trwa formatowanie dysku twardego</h1>}>
          <Routerr />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default App;
