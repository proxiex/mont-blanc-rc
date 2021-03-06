import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import Login from "./login";

const iconStyle = {
  margin: "10px 10px 10px 6px",
  width: "20px",
  fontSize: "inherit",
  textAlign: "center"
};

const analyticsLinkStyle = {
  backgroundColor: "white",
  color: "black"
};

const analyticsIconStyle = {
  margin: "10px 10px 10px -13px",
  width: "20px",
  fontSize: "inherit",
  textAlign: "center"
};

const menuStyle = {
  padding: "0px 10px 10px 10px",
  minWidth: 220,
  minHeight: 50
};

class MainDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false
    }
  }
  static propTypes = {
    adminShortcuts: PropTypes.object,
    currentAccount: PropTypes.oneOfType(
      [PropTypes.bool, PropTypes.object]
    ),
    handleChange: PropTypes.func,
    userImage: PropTypes.object,
    userName: PropTypes.string,
    userShortcuts: PropTypes.object
  }

  componentDidMount() {
    this.setState({
      isAdmin: Reaction.hasPermission("admin")
    })
  }

  buttonElement() {
    const { userImage, userName } = this.props;
    return (
      <Components.Button containerStyle={{ color: "#000", fontWeight: "normal", letterSpacing: 0.8 }}>
        <span>{userImage}</span>
        <span>{userName}</span>&nbsp;
        <Components.Icon
          icon={"fa fa-caret-down"}
        />
      </Components.Button>
    );
  }

  renderAdminIcons() {
    return (
      Reaction.Apps(this.props.adminShortcuts).map((shortcut) => (
        <Components.MenuItem
          key={shortcut.packageId}
          className="accounts-a-tag"
          label={shortcut.label}
          i18nKeyLabel={shortcut.i18nKeyLabel}
          icon={shortcut.icon}
          iconStyle={iconStyle}
          value={shortcut}
        />
      ))
    );
  }

  renderUserIcons() {
    return (
      Reaction.Apps(this.props.userShortcuts).map((option) => (
        <Components.MenuItem
          key={option.packageId}
          className="accounts-a-tag"
          label={option.label}
          i18nKeyLabel={option.i18nKeyLabel}
          icon={option.icon && option.icon}
          iconStyle={iconStyle}
          value={option}
        />
      ))
    );
  }

  renderWallet() {
   return (
     <a
       className="rui menu-item accounts-a-tag wallet-link-tag"
       type="button"
       href="/wallet"
     >
       <i className="rui font-icon fa fa-credit-card" style={iconStyle}></i>
       <span>Wallet</span>
     </a>
   );
 }

  renderSignOutButton() {
    return (
      <Components.MenuItem
        className="btn btn-primary btn-block accounts-btn-tag"
        label="Sign out"
        value="logout"
      />
    );
  }

  renderSignInComponent() {
    return (
      <div className="accounts-dropdown">
        <div className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000">
          <span><Components.Translation defaultValue="Sign In" i18nKey="accountsUI.signIn" /></span><b className="caret" />
        </div>
        <div
          className="accounts-dialog accounts-layout dropdown-menu pull-right"
          style={{ padding: "10px 20px" }}
        >
          <Login />
        </div>
      </div>
    );
  }
  renderAnalytics() {
    if (this.state.isAdmin) {
      return (
        <a className="rui menu-item"
          style={analyticsLinkStyle}
          type="button"
          href="/dashboard/analytics">
          <i className="rui font-icon fa fa-bar-chart" style={analyticsIconStyle}></i>
          <span>Analytics</span>
        </a>
      )
    } else if (!this.state.isAdmin) {
      return (
        <a className="rui menu-item"
          style={analyticsLinkStyle}
          href="/dashboard/analytic"></a>
      )
    }
  }




  render() {
    return (
      <div className="accounts">
        {this.props.currentAccount ?
          <div style={{ paddingRight: 5 }}>
            <Components.DropDownMenu
              buttonElement={this.buttonElement()}
              attachment="bottom right"
              targetAttachment="top right"
              menuStyle={menuStyle}
              className="accounts-li-tag"
              onChange={this.props.handleChange}
            >
              {this.renderAnalytics()}
              {this.renderUserIcons()}
              {this.renderAdminIcons()}
              {this.renderWallet()}
              {this.renderSignOutButton()}
            </Components.DropDownMenu>
          </div>
          :
          <div className="accounts dropdown" role="menu">
            {this.renderSignInComponent()}
          </div>
        }
      </div>
    );
  }
}

export default MainDropdown;
