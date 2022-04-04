import "./App.css";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <div className="app">
      <Route exact path="/">
        <Redirect to="/signup" />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <ProtectedRoute component={Home} path="/home" redirect="/signup" />
    </div>
  );
}

export default App;
