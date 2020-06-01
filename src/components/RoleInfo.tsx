import React from 'react'
import { connect } from 'react-redux'
import './RoleInfo.css';
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

    return (
      <div className="roleinfo">
        <div className="roleinfo__role-pretext">
          You are a <br/>
          <span className="roleinfo__role">{this.props.role}</span>
        </div>
        {this.props.hasShown}
        <DismissRoleInfo text="Got it" className="roleinfo__dismiss" />
      </div>
    );
  }
}

export default RoleInfo
