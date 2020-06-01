import { connect } from 'react-redux'
import Button from '../../components/Button'
import { dismissRoleInfo } from '../../actions/faker'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => { dispatch(dismissRoleInfo()) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
