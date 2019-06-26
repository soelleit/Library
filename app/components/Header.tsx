import * as React from 'react';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="row clearfix">
            <div className="column">
              <Link to="/"><h2 className="site-title">Octopus Deploy Library</h2></Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  static displayName = "octopus-library-header"
}
