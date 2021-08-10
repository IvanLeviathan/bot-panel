import { Route, Switch, Redirect} from "react-router-dom";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Home from "../components/Home";
import UsersPage from "../components/pages/Users";

export const HomePage = () => {
  return <Switch>
    <Route path="/settings" component={Settings} />
    {/* <Route path="/profile" component={Profile} /> */}
    <Route path="/users" component={UsersPage}/>
    <Route path="/" component={Home}/>
    <Redirect to="/" />
  </Switch>
}