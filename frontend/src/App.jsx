import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ NEW
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import StudentsListPage from './pages/StudentsListPage';
import AddStudentPage from './pages/AddStudentPage';
import LiveUpdatePage from "./pages/LiveUpdatePage";
import MessagesPage from './pages/MessagesPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TripsPage from "./pages/TripsPage";
import TripAttendancePage from "./pages/TripAttendancePage";
import AttendanceCreatePage from './pages/AttendanceCreatePage';
import TripsAddForm from "./forms/TripsAddForm";
import ReportsPage from './pages/ReportsPage';
import UserAccountPage from './pages/UserAccountPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/list"
            element={
              <ProtectedRoute>
                <StudentsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute>
                <AddStudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live"
            element={
              <ProtectedRoute>
                <LiveUpdatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent"
            element={
              <ProtectedRoute>
                <h2>Parent Dashboard</h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver"
            element={
              <ProtectedRoute>
                <h2>Driver Dashboard</h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <h2>Admin Dashboard</h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <TripsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:tripId/attendance"
            element={
              <ProtectedRoute>
                <TripAttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/create/:tripId"
            element={
              <ProtectedRoute>
                <AttendanceCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/add"
            element={
              <ProtectedRoute>
                <TripsAddForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
              {/* other routes */}
              <Route path="/account" element={<UserAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
