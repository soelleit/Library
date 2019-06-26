import * as React from 'react';

interface GoogleButtonProps {
  url: string;
}

interface GoogleButtonState{
  initialized: boolean;
}

export default class GoogleButton extends React.Component<GoogleButtonProps, GoogleButtonState>{
  buttonRef: React.RefObject<any>;

  constructor(props: GoogleButtonProps) {
    super(props);
    this.state = { initialized : false };
    this.buttonRef = React.createRef();
  }

  componentDidMount(){
    this.init();
  }

  componentWillUnmount(){
    let elem = document.getElementById('gapi');
    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

  init () {
    if (this.state.initialized){
      return;
    }

    let gpbutton = this.buttonRef.current;

    if (gpbutton){
      let gpscript = document.createElement('script');
      gpscript.src = '//apis.google.com/js/platform.js';
      gpscript.id = 'gapi';
      gpscript.onload = this.renderWidget.bind(this);
      gpbutton.parentNode.appendChild(gpscript);

      this.setState({initialized: true });
    }
  }

  renderWidget(){
    (window as any).gapi.plusone.render('gpbutton');
  }

  render(){
    return (

      <div
          className="g-plus"
          data-action="share"
          data-annotation="bubble"
          id="gpbutton"
          ref={this.buttonRef}
      />
    );

  }

  static displayName = "GoogleSocialButton";

  static defaultProps = {
    url: ""
  };
}
