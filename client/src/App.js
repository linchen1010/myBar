import './App.css';
import Header from './components/Header';
import Cocktails from './components/Cocktails';
import HomeCover from './components/HomeCover';
import About from './components/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={HomeCover} />
        <Route path="/" exact component={Cocktails} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
