import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layout/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('../home.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login.js').default
      },
      {
        "path": "/profile",
        "exact": true,
        "component": require('../profile.js').default
      },
      {
        "path": "/users",
        "exact": false,
        "component": require('../users/_layout.js').default,
        "routes": [
          {
            "path": "/users/add",
            "exact": true,
            "component": require('../users/add.js').default
          },
          {
            "path": "/users/detail/:id",
            "exact": true,
            "component": require('../users/detail/$id.js').default
          },
          {
            "path": "/users/list",
            "exact": true,
            "component": require('../users/list.js').default
          },
          {
            "component": () => React.createElement(require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@0.22.0@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layout\\\\index.js","routes":[{"path":"/404","exact":true,"component":"./pages/404.js"},{"path":"/home","exact":true,"component":"./pages/home.js"},{"path":"/","exact":true,"component":"./pages/index.js"},{"path":"/login","exact":true,"component":"./pages/login.js"},{"path":"/profile","exact":true,"component":"./pages/profile.js"},{"path":"/users","exact":false,"component":"./pages/users/_layout.js","routes":[{"path":"/users/add","exact":true,"component":"./pages/users/add.js"},{"path":"/users/detail/:id","exact":true,"component":"./pages/users/detail/$id.js"},{"path":"/users/list","exact":true,"component":"./pages/users/list.js"}]}]}]' })
          }
        ]
      },
      {
        "component": () => React.createElement(require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@0.22.0@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layout\\\\index.js","routes":[{"path":"/404","exact":true,"component":"./pages/404.js"},{"path":"/home","exact":true,"component":"./pages/home.js"},{"path":"/","exact":true,"component":"./pages/index.js"},{"path":"/login","exact":true,"component":"./pages/login.js"},{"path":"/profile","exact":true,"component":"./pages/profile.js"},{"path":"/users","exact":false,"component":"./pages/users/_layout.js","routes":[{"path":"/users/add","exact":true,"component":"./pages/users/add.js"},{"path":"/users/detail/:id","exact":true,"component":"./pages/users/detail/$id.js"},{"path":"/users/list","exact":true,"component":"./pages/users/list.js"}]}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
