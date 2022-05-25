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
import {DashboardPastesScreen} from "../components/dashboard/Pastes/PastesScreen";
import {DashboardHomeScreen} from "../components/dashboard/HomeScreen";
import React from "react";
import {DashboardUsersScreen} from "../components/dashboard/Users/UsersScreen";
import {DashboardUserEditScreen} from "../components/dashboard/Users/UserEditScreen";

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
                   // home
                   <Route index element={<DashboardHomeScreen />} />
                   // pastes
                   <Route path="pastes" element={<DashboardPastesScreen />} />
                   <Route path="pastes/:id" element={<DashboardPastesScreen />} />
                   // users
                   <Route path="users" element={<DashboardUsersScreen />} />
                   <Route path="users/:id" element={<DashboardUserEditScreen />} />
               </Route>
           </Routes>
    </Router>
  );
};
