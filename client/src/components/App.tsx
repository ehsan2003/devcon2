import React, {Component} from 'react';
import Header from "@components/Header";
import {Route, Switch} from "react-router";
import Home from "@components/Home";
import About from "@components/About";
import Contact from "@components/Contact";
import Blog from "@components/Blog";
import {Toolbar} from "@material-ui/core";
import PageProgress from "@components/PageProgress";
import RegisterPage from "@components/RegisterPage";
import Notifier from "@components/Notifier";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Toolbar/>
                <PageProgress/>
                <Notifier/>
                <Switch>
                    <Route path={'/'} exact><Home/></Route>
                    <Route path={'/blog'}><Blog/></Route>
                    <Route path={'/about'}><About/></Route>
                    <Route path={'/contact'}><Contact/></Route>
                    <Route path={'/register'}><RegisterPage/></Route>
                </Switch>
            </div>
        );
    }
}

export default App;