'use strict';

import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';

import App from './components/App';
import Listing from './components/Listing';
import TemplateItem from './components/TemplateItem';

let routes = (
  <Route component={App}
      path="/"
  >
    <Redirect to="listing" />
    <Route component={Listing}
        path="listing(/:searchTerm)"
    />
    <Route  component={TemplateItem}
        path="step-template/:friendlySlugOrId(/:friendlySlug)"
    />
    <Route component={TemplateItem}
        path="step-templates/:friendlySlugOrId(/:friendlySlug)"
    />
  </Route>
);

export default routes;
