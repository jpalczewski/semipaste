import {Route, BrowserRouter as Router, Routes, BrowserRouter} from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import { Current } from "../components/CurrentScreen";
import { Popular } from "../components/PopularScreen";
import { About } from "../components/AboutScreen";
import { UserScreen } from "../components/user/UserScreen";
import {Dashboard} from "../components/dashboard/DashboardScreen";
import {DashboardPastesScreen} from "../components/dashboard/DashboardPastesScreen";
import {DashboardHomeScreen} from "../components/dashboard/DashboardHomeScreen";
import React from "react";
import {DashboardUsersScreen} from "../components/dashboard/DashboardUsersScreen";

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
               <Route path="/user" element={<UserScreen />} />
               <Route path="dashboard" element={<Dashboard />}>
                   <Route index element={<DashboardHomeScreen />} />
                   <Route path="pastes" element={<DashboardPastesScreen />} />
                   <Route path="users" element={<DashboardUsersScreen />} />
               </Route>
           </Routes>
    </Router>
  );
};
