import React from 'react'
import NameInput from './NameInput'
import ShareLink from './ShareLink'
import StartButton from '../containers/StartButton'
import { PENDING } from '../models/MusictionaryState'

class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let pending = this.props.gameState === PENDING
    return (
      <div className="pregame-header">
        {this.props.gameState}
        { pending ? <NameInput /> : null}
        <ShareLink />
        { pending ? <StartButton text="Start" /> : null}
      </div>
    );
  }
}

export default Header
