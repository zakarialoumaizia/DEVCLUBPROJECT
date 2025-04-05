import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import Login from './pages/Login';
import Join from './pages/Join';
import ClubPresident from './pages/ClubPresident';
import Blog from './pages/Blog';
import VerifyEmail from './pages/VerifyEmail';
import Contact from './pages/Contact';
import Register from './pages/Register';
import OTPVerification from './pages/OTPVerification';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AdminMembers from './admin/Members';
import AdminEvents from './admin/Events';
import AdminAnnouncements from './admin/Announcements';
import AdminBlog from './admin/Blog';
import RegistrationHistory from './admin/RegistrationHistory';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
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
            <Route path="/verify-email" element={
              <>
                <Navbar />
                <VerifyEmail />
                <Footer />
              </>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<OTPVerification />} />

            {/* Admin Routes - No Navbar or Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/registration-history" element={<RegistrationHistory />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App; 