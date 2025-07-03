
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StudentsPage from './pages/StudentsPage'
import StudentsListPage from './pages/StudentsListPage'
import AddStudentPage from './pages/AddStudentPage'
import LiveUpdatePage from "./pages/LiveUpdatePage";
import MessagesPage from './pages/MessagesPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TripsPage from "./pages/TripsPage";
import TripAttendancePage from "./pages/TripAttendancePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/students/list" element={<StudentsListPage />} />
          <Route path="/students/add" element={<AddStudentPage />} />
          <Route path="students" element={<StudentsPage />} />
           <Route path="/live" element={<LiveUpdatePage />} />
           <Route path="/messages" element={<MessagesPage />} />
           <Route path="/login" element={<Login />} />
        <Route path="/parent" element={<h2>Parent Dashboard</h2>} />
        <Route path="/driver" element={<h2>Driver Dashboard</h2>} />
        <Route path="/admin" element={<h2>Admin Dashboard</h2>} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/trips" element={<TripsPage />} />
         <Route path="/trips/:tripId/attendance" element={<TripAttendancePage />} />

          {/* Add more child routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}



