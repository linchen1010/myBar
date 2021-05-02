import './App.css';
import Header from './components/Header';
import HomeCover from './components/HomeCover';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import CocktailHome from './components/Cocktails/CocktailHome';
import CocktailDetail from './components/Cocktails/CocktailDetail';
import CocktailSearch from './components/Cocktails/CocktailSearch';
import IngredientDetail from './components/Ingredients/IngredientDetail';
import Footer from './components/Footer';
import Drinks from './components/Drinks/Drinks';
import Drink from './components/Drinks/Drink';
import FlashMsg from './components/utils/FlashMsg';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import axios from 'axios';
import UserProfile from './components/Users/UserProfile';
import UserFavoriteList from './components/Users/UserFavoriteList';

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
            <Route exact path="/" exact component={CocktailHome} />
            <Route exact path="/drinks" component={Drinks} />
            <Route path="/drinks/category/:category" component={Drink} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/cocktails/:id" component={CocktailDetail} />
            <Route path="/ingredients/:name" component={IngredientDetail} />
            <Route path="/search" component={CocktailSearch} />
            <Route exact path="/user/:id" component={UserProfile} />
            <Route path="/user/:id/favorite" component={UserFavoriteList} />
          </div>
          <Route path="/" component={Footer} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
