import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, redirect, path, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route exact path={path}>
      {auth ? <Component {...rest} /> : <Redirect to={redirect} />}
    </Route>
  );
};
export default ProtectedRoute;
