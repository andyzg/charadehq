import React from 'react'
import { connect } from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';


class ShareLink extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {window.location.href}
        <CopyToClipboard text={window.location.href}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy invite link</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default connect()(ShareLink)

