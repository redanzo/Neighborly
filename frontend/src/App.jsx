// App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Marketplace from "./components/Marketplace";
import LostPets from "./components/LostPets";
import Alerts from "./components/Alerts";
import Events from "./components/Events";
import AddItemForm from './components/AddItemForm';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const hideNavbar = ["/","/login", "/signup"].includes(pathname);

  return (
    <div className="app">
      {/* this will now re‑evaluate on every route change */}
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace/:id?" element={<Marketplace />} />
        <Route path="/lostpets/:id?" element={<LostPets />} />
        <Route path="/alerts/:id?" element={<Alerts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add" element={<AddItemForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;