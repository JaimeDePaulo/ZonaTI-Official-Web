import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import SupportRequest from './pages/SupportRequest';
import TechnicianDashboard from './pages/TechnicianDashboard';
import ClientDashboard from './pages/ClientDashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pedido" element={<SupportRequest />} />
            <Route path="/cliente/dashboard" element={<ClientDashboard />} />
            <Route path="/tecnico/dashboard" element={<TechnicianDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
