import { connect } from 'react-redux'
import { SHOW_ROLE } from '../models/FakerState'
import Reveal from '../components/Reveal'
import { REVEAL_VOTES } from '../models/FakerState'

const mapStateToProps = (state, ownProps) => ({
  show: state.faker.gameState === REVEAL_VOTES
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reveal)

