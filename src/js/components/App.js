var {Component, PropTypes} = require('react');
var React = require('react/addons');
var Radium = require('radium');
var $ = require('jquery');
var Router = require('react-router');
var MobileDetect = require('mobile-detect');

var Colors = require('./ColorMe');
var SpaceTravel = require('./SpaceTravel');
var PureRender = require('./PureRender');
var glassesWhite = require('../../images/rounded-white.png');
var glassesBlack = require('../../images/rounded-black-64.png');

var Link = Router.Link;


@Radium
@PureRender
class Index extends Component {

  static willTransitionTo = (transition) => {
    $('canvas').parent().remove();
  }

  render(): any {
    var deviceDetect = new MobileDetect(window.navigator.userAgent);
    return (
      <div>
        <Link to="about">
          <span key='span' style={[styles.name, deviceDetect.mobile() && styles.nameMobile]}>
            L
            {deviceDetect.mobile() ? (
            <span style={styles.invisibleName}>
              <span>ai
                <img src={glassesBlack} style={styles.image}/>
              <br/></span>
              <span>Chia-Sheng</span>
            </span>): null}
            {Radium.getState(this.state, 'span', ':hover') ? (
              <span style={styles.invisibleName}>
                <span>ai
                  <img src={glassesWhite} style={styles.image}/>
                <br/></span>
                <span>Chia-Sheng</span>
              </span>
            ): null}
          </span>
        </Link>
        {!deviceDetect.mobile() ? <SpaceTravel ref='space'/> : null}
      </div>
    );
  }
}

var styles = {
  images: {
    position: 'relative',
    zIndex: 100,
  },

  name: {
    position: 'absolute',
    zIndex: 100,
    color: Colors.whiteSmoke,
    top: '20%',
    left: '15%',
    fontSize: '32px',
    letterSpacing: '.05em',

    ':hover': {
      cursor: 'pointer',
    }
  },

  nameMobile: {
    color: Colors.black,
  },

  invisibleName: {
    position: 'relative',
    zIndex: 100,
    color: Colors.gray3,
    fontSize: '32px',
    letterSpacing: '.05em',
  }
}

module.exports = Index;
