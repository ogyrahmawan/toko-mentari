import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/Cart';
import RegisterPage from './pages/Register'
import TransactionHistory from './pages/TransactionHistory';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/cart" component={CartPage} />
          <Route path="/transaction"component={TransactionHistory} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
