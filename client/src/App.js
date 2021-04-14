import './App.css';
import Header from './components/Header';
import Cocktails from './components/Cocktails/Cocktails';
import HomeCover from './components/HomeCover';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import CocktailHome from './components/Cocktails/CocktailHome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CocktailDetail from './components/Cocktails/CocktailDetail';
function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={HomeCover} />
        <Route path="/" exact component={CocktailHome}/>
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cocktails/:id" component={CocktailDetail} />
      </div>
    </Router>
  );
}

export default App;
