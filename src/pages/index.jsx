import { Route, Switch, Redirect} from "react-router-dom";
import Settings from "../components/Settings";
import Home from "../components/Home";
import UsersPage from "../components/pages/Users";
import StatsPage from "../components/pages/Stats";
import LogsPage from "../components/pages/Logs";

export const HomePage = () => {
  return <Switch>
    <Route path="/settings" component={Settings} />
    <Route path="/users" component={UsersPage}/>
    <Route path="/stats" component={StatsPage}/>
    <Route path="/logs" component={LogsPage}/>
    <Route path="/" component={Home}/>
    <Redirect to="/" />
  </Switch>
}