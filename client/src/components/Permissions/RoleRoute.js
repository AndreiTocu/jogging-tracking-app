import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

function RoleRoute(props) {
  return (
    <Route
      render={({ location }) =>
        (props.userData.role === "MANAGER" || props.userData.role === "ADMIN") ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
            />
        )
      }
    />
  );
}

export default RoleRoute
