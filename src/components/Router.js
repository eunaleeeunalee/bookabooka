import React, { useState } from "react";
import {HashRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import Write from "../routes/Write";
import Friend from "./Friend";
import Post from "./Post";
import { Helmet } from "react-helmet";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return(
        <Router>
            <Helmet>
                <title>Booka booka</title>
            </Helmet>
            <Switch>
                {isLoggedIn? (
                    <>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
                    </Route>
                    <Route exact path="/write">
                        <Write userObj={userObj}/>
                    </Route>
                    <Route exact path={["/friend","/friend/:who"]}>
                        <Friend userObj={userObj}/>
                    </Route>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    </>):(
                    <Route exact path="/">
                        <Auth/>
                    </Route>)}
            </Switch>
            {isLoggedIn && <><Navigation userObj={userObj}/></>}
        </Router>
    )
}

export default AppRouter;