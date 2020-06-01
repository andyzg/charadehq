import { connect } from 'react-redux'
import Button from '../components/Button'
import { startGame } from '../actions/faker'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => { dispatch(startGame()) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
