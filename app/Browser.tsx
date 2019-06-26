'use strict';

import * as React from "react";
import ReactDOM from "react-dom";
import {match, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Analytics from "./services/Analytics.js";

import LibraryActions from "./actions/LibraryActions";
import routes from "./Routes";


/*TODO: Hook into route changes via HOC to send analytics*/
function onRouteChange() {
  Analytics.sendPageView();
}

LibraryActions.sendTemplates((window as any).stepTemplates, () => {
  ReactDOM.render(
    <BrowserRouter>{routes}</BrowserRouter>,
    document.getElementById("reactRoot")
  );
});
