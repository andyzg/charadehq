import { connect } from 'react-redux'
import { SHOW_ROLE } from '../models/FakerState'
import Reveal from '../components/Reveal'
import { REVEAL_VOTES, ROLE_FAKER } from '../models/FakerState'

const mapStateToProps = (state, ownProps) => ({
  show: state.faker.gameState === REVEAL_VOTES,
  data: state.faker.payload,
  isFaker: state.faker.userState === ROLE_FAKER
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reveal)

