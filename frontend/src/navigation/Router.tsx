import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import { Current } from "../components/CurrentScreen";
import { Popular } from "../components/PopularScreen";
import { About } from "../components/AboutScreen";
import { AdminScreen } from "../components/user/AdminScreen";
import { Settings } from "../components/user/Settings";
import { UserScreen } from "../components/user/UserScreen";

export const Routerr = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="" element={<Home />} />
        <Route path="/current" element={<Current />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/user/admin" element={<AdminScreen />} />
        <Route path="/user/user" element={<UserScreen />} />
        <Route path="/user/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};
