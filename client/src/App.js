import './App.css';

import Header from './components/Header';
import Cocktail from './components/Cocktail';
import Cocktails from './components/Cocktails';
import HomeCover from './components/HomeCover';
function App() {
  return (
    <div>
      <Header />
      <HomeCover />
      <Cocktails />
    </div>
  );
}

export default App;
