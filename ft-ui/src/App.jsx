import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home.jsx';
import EditBlock from './components/EditBlock.jsx';
import EditFlow from './components/EditFlow.jsx';
import React  from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Home} />
                <Route  component={EditBlock} exact path="/edit/block/:blockId"/>
                <Route  component={EditFlow} exact path="/edit/flow/:flowId"/>
            </div>
        </Router>
    );
}

export default AppRouter;