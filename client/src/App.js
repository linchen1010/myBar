import './App.css';
import Header from './components/Header';
import MyRoutes from './MyRoutes';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const userInfo = useMemo(() => ({ user, setUser }), [user, setUser]);

  const fetchUser = async () => {
    const currentUser = await axios.get('/api/current_user');
    setUser(currentUser.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={userInfo}>
        <div className="Site">
          <Header />
          <div className="Site-content">
            <MyRoutes />
          </div>
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
