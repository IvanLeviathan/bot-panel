import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Home from "../components/Home";
import { urlPrefix } from "../_config";

export const HomePage = () => {
  return <Switch>
    <Route path={urlPrefix + "/settings"} component={Settings} />
    {/* <Route path="/stats" component={Settings} /> */}
    <Route path={urlPrefix + "/profile"} component={Profile} />
    <Route path={urlPrefix} component={Home}/>
    <Redirect to="/" />
  </Switch>
}