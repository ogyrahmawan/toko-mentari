import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
