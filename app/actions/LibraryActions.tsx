'use strict';

import AppDispatcher from './../dispatcher.js';

const LibraryActions = {
  sendTemplates(templates: any, callback: any) {
    AppDispatcher.dispatch({
      actionType: 'READ_SUCCESS',
      templates: templates
    });
    callback();
  }
};

export default LibraryActions;
