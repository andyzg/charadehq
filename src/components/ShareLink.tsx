import React from 'react'
import { connect } from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ShareLink.css';

class ShareLink extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let url = window.location.href.replace(/(^\w+:|^)\/\//, '');

    return (
      <div className="sharelink">
        <CopyToClipboard text={window.location.href}
          onCopy={() => this.setState({copied: true})}>
          <div className="sharelink__input">
            <span className="sharelink__url">
            {url}
            </span>
            <button className="sharelink__button">Copy invite link</button>
          </div>
        </CopyToClipboard>
      </div>
    );
  }
}

export default connect()(ShareLink)

