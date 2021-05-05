import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import SignIn from './SignIn/SignIn';
import Properties from './Dashboard/Properties';
import PropertyTags from './Dashboard/PropertyTags';
import TagHistory from './Dashboard/TagOverview/TagOverview'
import Users from './Dashboard/Users'


const ROUTES = [
    { path: "/", key: "ROOT", exact: true, component: Dashboard},
    //{ path: "/index.html", key: "ROOT", exact: true, component: Dashboard},
    { path: "/signin", key: "SIGNIN", exact: true, component: SignIn},
    { path: "/properties", key: "PROPERTIES", exact: true, component: Properties},
    { path: "/properties/:propertyId", key: "PROPERTIES", exact: true, component: PropertyTags},
    { path: "/tags/:tagId", key: "TAGHISTORY", exact: false, component: TagHistory},
    { path: "/users", key: "USERS", exact: true, component: Users},

    {
      path: "/dashboard",
      key: "DASHBOARD",
      component: RenderRoutes,
      routes: [
        {
          path: "/dashboard",
          key: "DASHBOARD_ROOT",
          exact: true,
          component: Dashboard
        }
      ],
    },
  ];
  
  export default ROUTES;
  
  function RouteWithSubRoutes(route) {
      return (
        <Route
          path={route.path}
          exact={route.exact}
          render={props => <route.component {...props} routes={route.routes} />}
        />
      );
    }
  
    /**
   * Use this component for any new section of routes (any config object that has a "routes" property
   */
  
  export function RenderRoutes({ routes }) {
      return (
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={route.key} {...route} />;
          })}
          <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
      );
    }