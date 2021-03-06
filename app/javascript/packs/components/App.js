import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Signup from './Signup'
import Signin from './Signin'
import AboutUs from './AboutUs'
import FlowerList from './FlowerList'
import FlowerCreateForm from './FlowerCreateForm'
import FlowerEditForm from './FlowerEditForm'
import FlowerDetail from './FlowerDetail'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import { connect } from 'react-redux'
import * as a from '../actions'
import FavoriteList from './FavoriteList'
import Cart from './Cart'
import SelectAddress from './SelectAddress'
import Account from './Account'
import Addresses from './Addresses'
import AddressCreateForm from './AddressCreateForm'
import AddressEditForm from './AddressEditForm'
import Payments from './Payments'
import SelectPayment from './SelectPayment'
import ChooseShippingOptions from './ChooseShippingOptions'
import ReviewOrder from './ReviewOrder'
import Profile from './Profile'
import ProfileEditForm from './ProfileEditForm'

function App(props) {
  //func to check if signed in or not
  const checkLogin = () => {
    const { dispatch } = props;

    fetch("/signed_in")
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        let currentUser;

        if(jsonifiedResponse.user == null){
          currentUser = null;
          console.log("MUST SIGN IN")
        } else {
           currentUser = jsonifiedResponse.user;
        }
        const action = a.checkedLoginStatus(currentUser);
        dispatch(action);
      });
  }

  useEffect(() => {
    checkLogin();
    return () => {};
  }, []);


  return (
    <Router>
        <NavBar />
      <Switch>
        <Route path="/users/sign_up">
          <Signup />
        </Route>
        <Route path="/users/log_in">
          <Signin />
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/newflowers">
          <FlowerCreateForm />
        </Route>
        <Route path="/flower/:id">
          <FlowerDetail />
        </Route>
        <Route path="/editflowers/:id">
          <FlowerEditForm />
        </Route>
        <Route path="/favorites">
          <FavoriteList />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/select_address">
          <SelectAddress />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/addresses">
          <Addresses />
        </Route>
        <Route path="/newaddress">
          <AddressCreateForm />
        </Route>
        <Route path="/editaddress/:id">
          <AddressEditForm />
        </Route>
        <Route path="/payments">
          <Payments />
        </Route>
        <Route path="/selectpayment">
          <SelectPayment />
        </Route>
        <Route path="/shipping_options">
          <ChooseShippingOptions />
        </Route>
        <Route path="/shipping_options">
          <ChooseShippingOptions />
        </Route>
        <Route path="/review_order">
          <ReviewOrder />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/profile_edit">
          <ProfileEditForm />
        </Route>
        <Route path="/">
          <FlowerList />
        </Route>
      </Switch>
    </Router>
  )
}

App = connect()(App);

export default App;
