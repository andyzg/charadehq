import { connect } from 'react-redux'
import { setName } from '../actions/index'
import Input from '../components/Input'

const mapStateToProps = (state, ownProps) => ({
  hide: false,
  placeholder: "What's your name?",
  submitText: 'Submit'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: (name) => { dispatch(setName(name)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)

