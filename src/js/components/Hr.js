var {Component, PropTypes} = require('react');
var React = require('react/addons');
var PureRender = require('./PureRender');
var Radium = require('radium');


@Radium
@PureRender
class Hr extends Component {
  render(): any {
    return (
      <section style={styles.hr}>
        <span style={styles.hrAfter}>§</span>
      </section>
    );
  }
}


var styles = {

  hr: {
    zIndex: 100,
    flex: 1,
    margin: 'auto',
    width: '80%',
    padding: '0',
    borderTop: 'medium double #333',
    color: '#333',
    textAlign: 'center',
  },

  hrAfter: {
    zIndex: 100,
    display: 'inline-block',
    position: 'relative',
    top: '-0.7em',
    fontSize: '1.5em',
    padding: '0 0.25em',
  },
}

module.exports = Hr;
