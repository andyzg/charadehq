import React from 'react'
import NameInputContainer from '../containers/NameInputContainer'
import AnswerContainer from '../containers/AnswerContainer'
import ShareLink from './ShareLink'
import StartButton from '../containers/StartButton'
import { PENDING } from '../models/MusictionaryState'
import TimerContainer from '../containers/TimerContainer'
import PromptContainer from '../containers/PromptContainer'

class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let pending = this.props.showHeader
    let answerQuestion = this.props.answerQuestion
    console.log('Answer question: ', this.props.answerQuestion);

    if (pending) {
      return (
        <div className="pregame-header">
          {this.props.showHeader}
          { pending ? <NameInputContainer /> : null}
          <ShareLink />
          { pending ? <StartButton text="Start" /> : null}
        </div>
      );
    } else {
      return (
        <div className="pregame-header">
          <TimerContainer />
          <PromptContainer />
          { answerQuestion ? <AnswerContainer /> : null}
        </div>
      );
    }
  }
}

export default Header
