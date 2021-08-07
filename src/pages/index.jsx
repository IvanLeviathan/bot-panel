import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Home from "../components/Home";

export const HomePage = () => {
  return <Switch>
    <Route path="/settings" component={Settings} />
    <Route path="/stats" component={Home} />
    <Route path="/profile" component={Profile} />
    <Redirect to="/" />
  </Switch>
}