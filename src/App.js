
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/Login';
import Poker from './Components/Poker';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={ Login } />
        <Route path="/poker" component={ Poker } /> 
      </Router>
     
    </div>
  );
}

export default App;
