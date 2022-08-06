import React, { Component } from "react";
import '../stylesheets/Tabs.css';

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map(button => {
        return <button className={button === activeTab ? 'tab-btn tab-active' : 'tab-btn'} onClick={() => changeTab(button)}>{button}</button>
      })}
    </div>
  )
};

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label
  }

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {

    let content = null;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, child => {
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab)
            content = child.props.children
        })}

        <div className="tab-header">
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
        </div>

        <div className="tab-content">{content}</div>

      </div>
    );
  }
}

const Tab = props => {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}


/*
 * Tabs is the stateful component.
 * You can pass an index in the `selected` prop
 * to specify which tab is active by default.
 *
 * This component handles the entire tabs system.
 * It transforms its own children (if they are Tab or TabPanel) to pass the
 * required props in order to run automatically the system.
 */

class VTabs extends Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected })
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab)
  }

  renderTabList(child) {
    let tab = 0

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, (childTab) => {
        if (childTab.type.name === "VTab") {
          const _isActive = (tab === this.state.selected)
          const _onClick = this.handleClick(tab)

          tab++

          return React.cloneElement(childTab, { _isActive, _onClick })
        }

        return childTab
      }),
    })
  }

  renderChildren(children) {
    let panel = 0

    return React.Children.map(children, (child) => {
      if (child.type.name === "VTabList") {
        return this.renderTabList(child)
      }

      if (child.type.name === "VTabPanel") {
        const _isActive = (panel === this.state.selected)

        panel++

        return React.cloneElement(child, { _isActive })
      }

      return child
    })
  }

  render() {
    return (
      <div className="VTabs">
        {this.renderChildren(this.props.children)}
      </div>
    )
  }
}

const VTabList = ({ children }) => (
  <ul className="VTabList">
    {children}
  </ul>
)

const VTab = ({ _onClick, _isActive, children, }) => (
  <li
    className={`VTab  ${_isActive ? "is-active" : ""}`}
    onClick={_onClick}>
    {children}
  </li>
)

const VTabPanel = ({ _isActive, children, }) => (
  <div className={`VTabPanel  ${_isActive ? "is-active" : ""}`}>
    {children}
  </div>
)

const VButton = ({ children }) => (
  <button className="VButton">
    {children}
  </button>
)

export { Tabs, Tab, VTabs, VTabList, VTab, VTabPanel, VButton };

