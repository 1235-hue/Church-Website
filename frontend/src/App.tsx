import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Items from './pages/Items';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Rsvp from './pages/Rsvp';
import Donate from './pages/Donate';
import Invitation from './pages/Invitation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Contributions from './pages/Contributions';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />

        {/* Authenticated (any role) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/items"      element={<Items />} />
        <Route path="/events"     element={<Events />} />
        <Route path="/gallery"    element={<Gallery />} />
        <Route path="/rsvp"       element={<Rsvp />} />
        <Route path="/donate"     element={<Donate />} />
        <Route path="/invitation" element={<Invitation />} />

        {/* Admin only */}
        <Route path="/admin"         element={<ProtectedRoute roles={['admin','staff']}><Admin /></ProtectedRoute>} />
        <Route path="/contributions" element={<ProtectedRoute roles={['admin','staff']}><Contributions /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
