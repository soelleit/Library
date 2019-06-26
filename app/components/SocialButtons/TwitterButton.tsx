import * as React from 'react';

interface TwitterButtonProps {
  text: string;
  url: string;
}

interface TwitterButtonState {
  initialized: boolean;
}

export default class TwitterButton extends React.Component<TwitterButtonProps, TwitterButtonState>{
  buttonRef: React.RefObject<any>;

  constructor(props: TwitterButtonProps) {
    super(props);
    this.state = { initialized : false };
    this.buttonRef = React.createRef();
  }

  componentDidMount(){
    this.init();
  }

  componentWillUnmount(){
    let elem = document.getElementById('twitter-wjs');
    if (elem && elem.parentNode){
      elem.parentNode.removeChild(elem);
    }
  }

  init () {
    if (this.state.initialized){
      return;
    }

    var twitterbutton = this.buttonRef.current;
    if (twitterbutton) {
      var twitterscript = document.createElement('script');
      twitterscript.src = '//platform.twitter.com/widgets.js';
      twitterscript.id = 'twitter-wjs';
      twitterscript.onload = this.renderWidget.bind(this);
      twitterbutton.parentNode.appendChild(twitterscript);

      this.setState({ initialized: true });
    }
  }

  renderWidget(){
    let text = '';
    if(this.props.text != undefined){
      text = this.props.text;
    }

    (window as any).twttr.widgets.createShareButton(
      this.props.url,
      this.buttonRef.current,
      { text: text }
    );
  }

  render(){
    return (
      <a className="twitter-share-button"
          data-via="library-octopusdeploy"
          href="https://twitter.com/share"
          ref={this.buttonRef}
      />
    );
  }

  static displayName = "SocialTwitterButton";

  static defaultProps = {
    text: "",
    url: ""
  };
}
