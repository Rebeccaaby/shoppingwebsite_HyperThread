import React from 'react';
import {BrowserRouter as Route, Router, Switch} from "react-router-dom";
import Pay from "./Pay";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path = "/Pay">
                    <Pay />
                </Route>
                <Route path ="/success">
                    <Success />
                </Route>
            </Switch>
        </Router>
    );
};

export default App