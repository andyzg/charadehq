import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  gameState: state.musictionary.state
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
