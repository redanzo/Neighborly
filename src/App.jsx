import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Marketplace from './components/Marketplace';
// import LostPets from './components/LostPets';
// import Alerts from './components/Alerts';
// import Events from './components/Events';
// import Profile from './components/Profile';
// import Settings from './components/Settings';
// import Logout from './components/Logout';

function App() {
  const [currentPage, setCurrentPage] = useState('Home'); // Default to Marketplace

  const renderPage = () => {
    switch(currentPage) {
      case 'Home':
        return <Home />;
      case 'Marketplace':
        return <Marketplace />;
      case 'LostPets':
        return <Home />;
      case 'Alerts':
        return <Home />;
      case 'Events':
        return <Home />;
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
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  )
}

export default App;