var _ = require('lodash');
var {Component} = require('react');
var PureRender = require('./PureRender');
var AttractorsTrip = require('./AttractorsTrip');


@PureRender
class SpaceTravel extends Component {

  componentDidMount() {
    AttractorsTrip();
  }

  render(): any {
    return null;
  }
}

module.exports = SpaceTravel;
