import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './frontend/src/pages/Home'
import About from './frontend/src/pages/About'
import Events from './frontend/src/pages/Events'
import Announcements from './frontend/src/pages/Announcements'
import Login from './frontend/src/pages/Login'
import Join from './frontend/src/pages/Join'
import VerifyEmail from './frontend/src/pages/VerifyEmail'
import ClubPresident from './frontend/src/pages/ClubPresident'
import Blog from './frontend/src/pages/Blog'
import Navbar from './frontend/src/components/Navbar'
import Footer from './frontend/src/components/Footer'

// Admin Components
import AdminLogin from './frontend/src/admin/Login'
import AdminDashboard from './frontend/src/admin/Dashboard'
import AdminMembers from './frontend/src/admin/Members'
import AdminEvents from './frontend/src/admin/Events'
import AdminAnnouncements from './frontend/src/admin/Announcements'
import AdminBlog from './frontend/src/admin/Blog'

function App() {
  return (
    <ChakraProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/events" element={
            <>
              <Navbar />
              <Events />
              <Footer />
            </>
          } />
          <Route path="/announcements" element={
            <>
              <Navbar />
              <Announcements />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/join" element={
            <>
              <Navbar />
              <Join />
              <Footer />
            </>
          } />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/president" element={
            <>
              <Navbar />
              <ClubPresident />
              <Footer />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Navbar />
              <Blog />
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App