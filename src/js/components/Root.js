var {Component} = require('react');
var React = require('react/addons');
var Radium = require('radium');
var Router = require('react-router');
var Header = require('./Header');
var PureRender = require('./PureRender');
var LoadingSprint = require('./LoadingSprint');
var API = require('./API');
var asap = require('asap');

var RouteHandler = Router.RouteHandler



@Radium
@PureRender
class Root extends Component {
  state = {
    isLoading: false,
  }

  // template of subscription
  _subscriptions = [{remove() {}}];

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
        {this.state.isLoading ? <LoadingSprint /> : null}
        <Header
          path={this.props.path}
        />
        <RouteHandler {...this.props} />
      </div>
    );
  }
}

module.exports = Root;
