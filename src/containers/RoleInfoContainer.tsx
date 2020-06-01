import { connect } from 'react-redux'
import { SHOW_ROLE } from '../models/FakerState'
import RoleInfo from '../components/RoleInfo'

const mapStateToProps = (state, ownProps) => ({
  role: state.faker.userState,
  showRole: state.session.roleModal
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleInfo)
