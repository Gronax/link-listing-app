import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeList from './routeList';
import NoMatch from '../containers/NoMatch';

const Routes = () => {
  const routeMap = routeList.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    );
  });

  return (
    <Switch>
      {routeMap}
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Routes;
