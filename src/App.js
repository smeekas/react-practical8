import "./App.css";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { getData } from "./services/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { userActionTypes } from "./actionTypes/userActionTypes";
import { useHistory } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    const users = getData();
    console.log(users);
    if (users) {
      dispatch({
        type: userActionTypes.ADD_USER_DATA,
        userData: users,
      });
      history.push("home");
    }
  }, [dispatch, history]);
  return (
    <div className="app">
      <Route exact path="/">
        <Redirect to="/signup" />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      {/* <Route path="*">
        <p>error</p>
      </Route> */}
      <ProtectedRoute
        component={Home}
        auth={auth}
        path="/home"
        redirect="/signup"
      />
    </div>
  );
}

export default App;
