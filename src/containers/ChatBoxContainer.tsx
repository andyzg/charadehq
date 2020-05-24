import { connect } from 'react-redux'
import ChatBox from '../components/ChatBox'

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox)

