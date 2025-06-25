//
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StudentsPage from './pages/StudentsPage'
import StudentsListPage from './pages/StudentsListPage'
import AddStudentPage from './pages/AddStudentPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/students/list" element={<StudentsListPage />} />
          <Route path="/students/add" element={<AddStudentPage />} />
          <Route path="students" element={<StudentsPage />} />
          {/* Add more child routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}



