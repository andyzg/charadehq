import { connect } from 'react-redux'
import Timer from '../components/Timer'

const mapStateToProps = (state, ownProps) => ({
  timer: state.session.timer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
