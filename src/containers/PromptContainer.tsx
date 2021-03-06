import { connect } from 'react-redux'
import { submitPrompt } from '../actions/index'
import Input from '../components/Input'

const mapStateToProps = (state, ownProps) => ({
  hide: !(state.session.promptModal),
  placeholder: 'How many times did you...?',
  submitText: 'Submit prompt'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: (q) => { dispatch(submitPrompt(q)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
