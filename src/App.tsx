import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import RegisterPage from './pages/RegisterPage'
import DashboardRedirect from './pages/DashboardRedirect'
import TicketList from './components/ticket/TicketList'
import UsersList from './components/admin/UsersList'
import NotFound from './pages/NotFoundPage'
import AddTicket from './components/ticket/AddTicket'
import AddUser from './components/admin/AddUser'

function App() {

  return (
    <Routes>
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>


      <Route element={<AuthGuard allowedRoles={["admin", "agent", "customer"]} />}>
        <Route path="/dashboard" element={<DashboardRedirect />} />


        <Route path="/tickets" element={<TicketList />} >
          <Route path=":id" element={<div />} />
          <Route path="new" element={<AddTicket />} />
        </Route>

      </Route>

      <Route element={<AuthGuard allowedRoles={["admin"]} />}>
        <Route path="/users" element={<UsersList></UsersList>} >
          <Route path="new" element={<AddUser />} />
        </Route>
      </Route>

      <Route element={<AuthGuard allowedRoles={["customer"]} />}>
        <Route path="/tickets/new" element={<div>NewTicket</div>} />
      </Route>

      //default
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
