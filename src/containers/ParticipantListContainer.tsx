import { connect } from 'react-redux'
import ParticipantList from '../components/ParticipantList'

const mapStateToProps = (state, ownProps) => ({
  participants: state.participants,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantList)
