import * as React from 'react';
import FacebookButton from './SocialButtons/FacebookButton';
import GoogleButton from './SocialButtons/GoogleButton';
import TwitterButton from './SocialButtons/TwitterButton';

export default class SocialButtons extends React.Component {
  render() {
    return (
      <div className="social-buttons">
        <GoogleButton />
        <TwitterButton />
        <FacebookButton />
      </div>
    );
  }

  static displayName = "octopus-library-template-social-buttons"
}
