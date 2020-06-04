import { connect } from 'react-redux'
import { PENDING, ANSWER } from '../models/FakerState'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  showHeader: state.faker.gameState === PENDING,
  answerQuestion: state.faker.gameState === ANSWER
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
