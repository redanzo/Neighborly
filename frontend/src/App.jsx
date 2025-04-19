import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';

import Login from './components/Login';
import Signup from './components/Signup';

import Home from './components/Home';
import Marketplace from './components/Marketplace';
import LostPets from './components/LostPets';
import Alerts from './components/Alerts';
import Events from './components/Events';
// import Profile from './components/Profile';
// import Settings from './components/Settings';
// import Logout from './components/Logout';

function App() {
  const [currentPage, setCurrentPage] = useState('Home'); // Default to Marketplace

  const renderPage = () => {
    switch(currentPage) {
      case 'Login':
        return <Login switchPage={setCurrentPage} />;
      case 'Signup':
        return <Signup switchPage={setCurrentPage} />;
      case 'Home':
        return <Home />;
      case 'Marketplace':
        return <Marketplace />;
      case 'LostPets':
        return <LostPets />;
      case 'Alerts':
        return <Alerts />;
      case 'Events':
        return <Events />;
      case 'Profile':
        return <Home />;
      case 'Settings':
        return <Home />;
      case 'Logout':
        return <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      {currentPage !== 'Login' && currentPage !== 'Signup' && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {renderPage()}
    </div>
  );
}

export default App;