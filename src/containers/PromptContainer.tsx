import { connect } from 'react-redux'
import { submitPrompt } from '../actions/index'
import Prompt from '../components/Prompt'

const mapStateToProps = (state, ownProps) => ({
  showPrompt: state.session.promptModal
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPrompt: (q) => { dispatch(submitPrompt(q)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prompt)
