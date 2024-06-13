import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import AddUser from "./pages/users/AddUser";
import Users from "./pages/users/Users";
import useAuth from './authGuard/useAuth';

const RequireAuth = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();
  const data = JSON.parse(localStorage.getItem('loggedUser'));
  const jwtPayload = data ? data : null;

  return authed || jwtPayload ? (
    children
  ) : (
    <Navigate to="/login" replace state={ { path: location.pathname } } />
  );
};

const RequireLogout = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();
  const data = JSON.parse(localStorage.getItem('loggedUser'));
  const jwtPayload = data ? data : null;

  return !authed && !jwtPayload ? (
    children
  ) : (
    <Navigate to="/" replace state={ { path: location.pathname } } />
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <RequireLogout><Login /></RequireLogout> } />
        <Route path="/register" element={ <RequireLogout><Register /></RequireLogout> } />
        <Route path="/" element={ <RequireAuth><Layout /></RequireAuth> }>
          <Route index element={ <Navigate to="dashboard" replace /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="profile" element={ <Profile /> } />
          <Route path="users" element={ <Users /> } />
          <Route path="users/addUser" element={ <AddUser /> } />
        </Route>
      </Routes>
    </>
  );
};

export default App;
