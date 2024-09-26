import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../services/localStorageServices";


const AuthenticatedRouteHOC = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser.email) {
      return <Component {...(props as P)} />;
    }

    return <Navigate to={`/auth`} />;
  };

  return AuthenticatedRoute;
};

export default AuthenticatedRouteHOC;
 