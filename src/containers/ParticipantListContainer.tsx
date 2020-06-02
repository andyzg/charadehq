import { connect } from 'react-redux'
import { setVote } from '../actions/faker'
import ParticipantList from '../components/ParticipantList'

const mapStateToProps = (state, ownProps) => ({
  voted: state.faker.voted,
  participants: state.participants
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setVote: (uuid) => { dispatch(setVote(uuid)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantList)
