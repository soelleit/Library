import * as React from "react";

interface FacebookButtonProps {
  url: string;
}

interface FacebookSocialButtonState{
  initialized: boolean;
}

export default class FacebookButton extends React.Component<FacebookButtonProps, FacebookSocialButtonState>{
  buttonRef: React.RefObject<any>;

  constructor(props: FacebookButtonProps) {
    super(props);
    this.state = { initialized : false };
    this.buttonRef = React.createRef();
  }

  componentDidMount(){
    this.init();
  }

  componentWillUnmount(){
    let elem = document.getElementById("facebook-jssdk");
    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

  init () {
    if (this.state.initialized) {
      return;
    }

    let fbsharebutton = this.buttonRef.current;
    if (fbsharebutton) {
      let fbscript = document.createElement("script");
      fbscript.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
      fbscript.id = "facebook-jssdk";
      fbscript.onload = this.renderWidget.bind(this);
      fbsharebutton.parentNode.appendChild(fbscript);

      this.setState({initialized: true });
    }
  }

  renderWidget(){
      /*
         need to detect if it has already been parsed.
         if coming from react router it may need reparsing.
      */
      setTimeout(() => {
        //let elem = document.getElementById("fbsharebutton");
        const elem = this.buttonRef.current;
        if (elem && elem.getAttribute("fb-xfbml-state") === null){
          (window as any).FB.XFBML.parse();
        }
      }, 1000);
  }

  render(){
    return (

      <div className="fb-share-button"
          data-layout="button_count"
          id="fbsharebutton"
          ref={this.buttonRef}
      />
    );

  }

  static displayName = "FacebookSocialButton"
  static defaultProps = {
    url: ""
  }
}
