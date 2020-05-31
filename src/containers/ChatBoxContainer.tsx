import { connect } from 'react-redux'
import { sendMessage } from '../actions/index'
import ChatBox from '../components/ChatBox'

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMessage: (message) => { dispatch(sendMessage(message)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox)

