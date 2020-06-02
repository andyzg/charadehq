import { connect } from 'react-redux'
import { PENDING } from '../models/FakerState'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  showHeader: state.faker.gameState === PENDING,
  showPrompt: state.session.promptModal
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
