import { connect } from 'react-redux'
import Content from '../components/Content'

const mapStateToProps = (state, ownProps) => ({
  condition: state.content.conditions,
  exercise: state.content.exercises,
  conditionIndex: state.content.conditionIndex,
  exerciseIndex: state.content.exerciseIndex,
  stage: state.nav,
  pack: state.content.pack
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
