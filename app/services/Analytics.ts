'use strict';

class Analytics {
  sendPageView() {
    console.log(`Sending page view of page '${document.location.pathname}'`);
    (window as any).ga('send', 'pageview', document.location.pathname);
  }

  sendEvent(category: string, name: string, value: string) {
    console.log(`Sending '${category}' event named '${name}' with value '${value}'`);
    (window as any).ga('send', 'event', category, name, value);
  }
}

export default new Analytics();
