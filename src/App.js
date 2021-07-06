import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/login";
import Skills from "./Pages/Skills/skills";
import Profile from "./Pages/Profile/profile";
function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/select-skill' component={Skills} />
      <Route path='/profile' component={Profile} />
    </Switch>
  );
}

export default App;
