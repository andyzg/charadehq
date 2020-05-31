import React from 'react'
import { connect } from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ShareLink.css';

class ShareLink extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  }

  render() {
    let url = window.location.href.replace(/(^\w+:|^)\/\//, '');

    return (
      <div className="sharelink">
        <CopyToClipboard text={window.location.href}
          onCopy={() => this.setState({copied: true})}>
          <div className="sharelink__group input-group mb-3">
            <input disabled={true} readOnly={true} onChange={this.handleChange} type="text" className="form-control sharelink__input" value={url} aria-label="Invite link" aria-describedby="Invite link" />
            <div className="input-group-append">
              <button className="btn nameinput__button" type="button">Copy invite</button>
            </div>
          </div>
        </CopyToClipboard>
      </div>
    );
  }
}

export default connect()(ShareLink)

