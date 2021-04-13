import './App.css';
import Header from './components/Header';
import Cocktails from './components/Cocktails/Cocktails';
import HomeCover from './components/HomeCover';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CocktailDetail from './components/Cocktails/CocktailDetail';
function App() {
  const urlTop10 = 'http://localhost:5000/cocktail/top10';
  const titleTop10 = 'Top 10';
  const urlRandom = 'http://localhost:5000/cocktail/random';
  const titleRandom = 'Random Drinks';
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={HomeCover} />
        {/* <Route path="/" exact component={Cocktails} /> */}
        <Route
          path="/"
          exact
          render={(props) => (
            <Cocktails {...props} url={urlTop10} title={titleTop10} />
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Cocktails {...props} url={urlRandom} title={titleRandom} />
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cocktails/:id" component={CocktailDetail} />
      </div>
    </Router>
  );
}

export default App;
