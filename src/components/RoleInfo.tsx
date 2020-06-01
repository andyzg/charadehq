import React from 'react'
import { connect } from 'react-redux'
import './RoleInfo.css';
import { ROLE_REAL } from '../models/FakerState'
import DismissRoleInfo from '../containers/faker/DismissRoleInfo'

class RoleInfo extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  }

  render() {
    if (!this.props.showRole) {
      return null;
    }

    let roleTitle = this.props.role === ROLE_REAL ? 'GOOD HUMAN BEING' : 'BOLD FAKER'

    return (
      <div className="roleinfo">
        <div className="roleinfo__role-pretext">
          You are a <br/>
          <span className="roleinfo__role">{roleTitle}</span>
        </div>
        {this.props.hasShown}
        <DismissRoleInfo text="Got it" className="roleinfo__dismiss" />
      </div>
    );
  }
}

export default RoleInfo
