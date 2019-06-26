import * as React from "react";
import Header from "./Header";
import Listing from "./Listing";
import Footer from "./Footer";

export default class App extends React.Component<any> {
  render() {
    return (
      <div>
        <div className="wrapper">
          <Header />
          <div className="content">
            <section>
              {this.props.children || <Listing />}
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  static displayName = "octopus-library";
}
