import { connect } from 'react-redux'
import { setName, submitAnswer } from '../actions/index'
import Input from '../components/Input'

const mapStateToProps = (state, ownProps) => ({
  hide: false,
  placeholder: state.faker.question,
  submitText: 'Submit answer'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: (answer) => { dispatch(submitAnswer(answer)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
