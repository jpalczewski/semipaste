import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./navigation/navigation";
import "./App.css";

import ErroPage from "./components/ErrorScreen";
import { Home } from "./components/HomeScreen";
import { Create } from "./components/CreateScreen";
import { Current } from "./components/CurrentScreen";
import { Popular } from "./components/PopularScreen";
import { About } from "./components/AboutScreen";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/current" element={<Current />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErroPage />} />
      </Routes>
    </Router>
  );
};

export default App;
