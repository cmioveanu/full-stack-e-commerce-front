import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Import components
import { Header } from './features/Header/Header';
import { Banner } from './features/Banner/Banner';
import { Products } from './features/Products/Products';
import { Footer } from './features/Footer/Footer';
import { Login } from './features/Login/Login';
import { Register } from './features/Login/Register';
import { Account } from './features/Account/Account';
import { About } from './features/About/About';
import { Contact } from './features/Contact/Contact';

//Import action creators
import { logIn } from './features/Login/LoginSlice';


const App = () => {
  const dispatch = useDispatch();

  //if user is logged in on the server, set the state as logged in
  useEffect(() => {
    fetch('https://full-stack-e-commerce-backend.herokuapp.com/api/account/checkLoginStatus').then(res => {
      if (res.status === 200 || res.status === 304) {
        dispatch(logIn());
      }
    });
  }, [dispatch]);


  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
              <Banner />
          </Route>

          <Route exact path="/products">
            <Products />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route eaxt path="/contact">
            <Contact />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route path="/account">
            <Account />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router >
  );
}

export default App;
