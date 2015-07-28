var {Component, PropTypes} = require('react');
var React = require('react/addons');
var Radium = require('radium');
var PureRender = require('./PureRender');
var Router = require('react-router');
var Header = require('./Header');
var API = require('./API');
var asap = require('asap');

var RouteHandler = Router.RouteHandler
var Link = Router.Link;

// template of subscription
var dummySubscription = {remove() {}};


@Radium
@PureRender
class Root extends Component {
  state = {
    isLoading: false,
  }

  _subscriptions = [dummySubscription];

  componentDidMount() {
    this._subscriptions = [];

    this._subscriptions.push(API.subscribe('start', () => {
      if (!this.state.isLoading) {
        asap(() => this.setState({isLoading: true}));
      }}));

    this._subscriptions.push(API.subscribe('allStopped', () => {
      asap(() => this.setState({isLoading: false}));
    }));
  }

  componentWillUnmount() {
    this._subscriptions.forEach(s => s.remove());
  }

  render(): any {
    return (
      <div>
        <Header
          path={this.props.path}
        />
        <RouteHandler {...this.props} />
      </div>
    );
  }
}

module.exports = Root;
