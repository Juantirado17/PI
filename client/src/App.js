import './App.css';
import { Route,useLocation  } from 'react-router-dom'
import {  Detail, Home, Create, LandingPage } from './viewsdogs'
import NavBar from './components/NavBar/NavBar';


function App() {
 const location = useLocation();
 
  return (
    <div className="App"> 
      {location.pathname !=="/"&& <NavBar />}
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/create">
        <Create />
      </Route>
      <Route exact path="/home/:id" >
        <Detail />
      </Route>
     </div>
  );
}

export default App;
