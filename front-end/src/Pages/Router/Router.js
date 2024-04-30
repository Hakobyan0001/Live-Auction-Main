import React from "react";
import { Router as MainRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "../../history";
import Layout from "../Layout";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import ItemDetails from "../ItemDetails";
const Router = () => {
  const login = useSelector((state) => state.login);
  return (
    <MainRouter history={history}>
      <Layout>
        <Switch>
          {login.isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/itemDetails/:id">
                <ItemDetails />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </>
          )}
        </Switch>
      </Layout>
    </MainRouter>
  );
};
export default Router;
