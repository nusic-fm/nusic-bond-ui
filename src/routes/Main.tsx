import { Switch, Route } from "react-router-dom";
import Intro from "../pages/Intro";
import Home from "../pages/Home";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Intro />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
};

export default Main;
