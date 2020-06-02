import { connect } from 'react-redux'
import { setVote } from '../actions/faker'
import profile from '../util/profile'
import ParticipantView from '../components/ParticipantView'

const mapStateToProps = (state, ownProps) => ({
  voted: state.faker.voted,
  myUUID: profile.getUUID()
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setVote: (uuid) => { dispatch(setVote(uuid)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantView)

