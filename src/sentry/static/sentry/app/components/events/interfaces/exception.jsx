import React from "react";
import ConfigStore from "../../../stores/configStore";
import GroupEventDataSection from "../eventDataSection";
import PropTypes from "../../../proptypes";
import ExceptionContent from "./exceptionContent";
import RawExceptionContent from "./rawExceptionContent";

var ExceptionInterface = React.createClass({
  propTypes: {
    group: PropTypes.Group.isRequired,
    event: PropTypes.Event.isRequired,
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    var user = ConfigStore.get("user");
    // user may not be authenticated
    var options = user ? user.options : {};
    var platform = this.props.event.platform;
    var newestFirst;
    switch (options.stacktraceOrder) {
      case "newestFirst":
        newestFirst = true;
        break;
      case "newestLast":
        newestFirst = false;
        break;
      case "default":
      default:
        newestFirst = (platform !== "python");
    }

    return {
      stackView: (this.props.data.hasSystemFrames ? "app" : "full"),
      newestFirst: newestFirst
    };
  },

  toggleStack(value) {
    this.setState({
      stackView: value
    });
  },

  render() {
    var group = this.props.group;
    var evt = this.props.event;
    var data = this.props.data;
    var stackView = this.state.stackView;
    var newestFirst = this.state.newestFirst;

    var title = (
      <div>
        <div className="btn-group">
          {data.hasSystemFrames &&
            <a className={(stackView === "app" ? "active" : "") + " btn btn-default btn-sm"} onClick={this.toggleStack.bind(this, "app")}>App Only</a>
          }
          <a className={(stackView === "full" ? "active" : "") + " btn btn-default btn-sm"} onClick={this.toggleStack.bind(this, "full")}>Full</a>
          <a className={(stackView === "raw" ? "active" : "") + " btn btn-default btn-sm"} onClick={this.toggleStack.bind(this, "raw")}>Raw</a>
        </div>
        <h3>
          {'Exception '}
          {newestFirst ?
            <small>(most recent call first)</small>
          :
            <small>(most recent call last)</small>
          }
        </h3>
      </div>
    );

    return (
      <GroupEventDataSection
          group={group}
          event={evt}
          type={this.props.type}
          title={title}
          wrapTitle={false}>
        {stackView === 'raw' ?
          <RawExceptionContent
            values={data.values}
            platform={evt.platform}/> :

          <ExceptionContent
            view={stackView}
            values={data.values}
            platform={evt.platform}
            newestFirst={newestFirst}/>
        }
      </GroupEventDataSection>
    );
  }
});

export default ExceptionInterface;
