
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Equipment from './pages/Equipment';
import Locations from './pages/Locations';
import  RentalInfo from './pages/RentalInfo';
import User from './pages/User';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TourRegistrationPage from './pages/TourRegistrationPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/equipment" component={Equipment} />
            <Route path="/Locations" component={Locations} />
            <Route path="/rentalInfo" component={RentalInfo} />
            <Route path="/user" component={User} />
            <Route path="/signupform" component={SignupForm} />
            <Route path="/loginform" component={LoginForm} />
            <Route path="/tour-registration/:tourId" component={TourRegistrationPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;