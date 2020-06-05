import { connect } from 'react-redux'
import { setVote } from '../actions/faker'
import profile from '../util/profile'
import ParticipantView from '../components/ParticipantView'

function getNames(state, uuid) {
  let participant = state.participants[uuid]
  let names = {}
  for (let i in participant.votes) {
    if (!state.participants[i]) { continue; }
    names[i] = state.participants[i].name
  }
  return names;
}

const mapStateToProps = (state, ownProps) => ({
  voted: state.faker.voted,
  myUUID: profile.getUUID(),
  gameState: state.faker.gameState,
  participant: state.participants[ownProps.participantUUID],
  names: getNames(state, ownProps.participantUUID)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setVote: (uuid) => { dispatch(setVote(uuid)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantView)

