'use strict';

class SlugMaker {
  make(name: string) {
    return "actiontemplate" + '-' + name.replace(/ \- /g, '-').replace(/ /g, '-').toLowerCase();
  }
}

export default new SlugMaker();
