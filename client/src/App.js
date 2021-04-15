import './App.css';
import Header from './components/Header';
import HomeCover from './components/HomeCover';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import CocktailHome from './components/Cocktails/CocktailHome';
import CocktailDetail from './components/Cocktails/CocktailDetail';
import IngredientDetail from './components/Ingredients/IngredientDetail';

import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={HomeCover} />
        <Route path="/" exact component={CocktailHome} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cocktails/:id" component={CocktailDetail} />
        <Route path="/ingredients/:id" component={IngredientDetail} />
      </div>
    </Router>
  );
}

export default App;
