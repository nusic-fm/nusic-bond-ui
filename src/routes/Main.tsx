import { Switch, Route } from "react-router-dom";
import Intro from "../pages/Intro";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Intro />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Main;
