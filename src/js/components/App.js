var {Component} = require('react');
var React = require('react/addons');
var Radium = require('radium');
var $ = require('jquery');
var Router = require('react-router');
var MobileDetect = require('mobile-detect');

var Colors = require('./ColorMe');
var SpaceTravel = require('./SpaceTravel');
var PureRender = require('./PureRender');

var Link = Router.Link;

/*
 * TODO: add some animation for mobile
*/

@Radium
@PureRender
class Index extends Component {

  static willTransitionTo = (transition) => {
    $('canvas').parent().remove();
  };

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
                <svg width='64px' height='64px' fill="black" version="1.1" viewBox="0 0 512 512">
                  <path d="M465.4,247c-2.2-22-12.4-43-28.9-58.4c-17.1-15.9-39.3-24.7-62.7-24.7c-41.5,0-77.3,27.4-88.5,67c-7-7-18.5-11.7-29.3-11.7  c-10.8,0-22.3,4.7-29.3,11.7c-11.2-39.6-47-67-88.5-67c-23.3,0-45.6,8.7-62.7,24.6C59,204,48.8,225,46.6,247H32v18h14.6  c2.2,22,12.4,43,28.9,58.4c17.1,15.9,39.3,24.7,62.7,24.7c50.8,0,92.1-41.2,92.1-92c0-0.1,0-0.1,0-0.1h0c0-9.9,11.5-21.6,25.7-21.6  s25.7,11.7,25.7,21.6h0c0,0,0,0,0,0.1c0,50.8,41.3,92,92.1,92c23.3,0,45.6-8.7,62.7-24.7c16.5-15.4,26.7-36.5,28.9-58.5H480v-18  H465.4z M373.8,333c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C450.8,298.5,416.3,333,373.8,333z M138.2,333  c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C215.2,298.5,180.7,333,138.2,333z"/>
                </svg>
              <br/></span>
              <span>Chia-Sheng</span>
            </span>): null}
            {Radium.getState(this.state, 'span', ':hover') ? (
              <span style={styles.invisibleName}>
                <span>ai
                  <svg width='64px' height='64px' fill={Colors.whiteSmoke} version="1.1" viewBox="0 0 512 512">
                    <path d="M465.4,247c-2.2-22-12.4-43-28.9-58.4c-17.1-15.9-39.3-24.7-62.7-24.7c-41.5,0-77.3,27.4-88.5,67c-7-7-18.5-11.7-29.3-11.7  c-10.8,0-22.3,4.7-29.3,11.7c-11.2-39.6-47-67-88.5-67c-23.3,0-45.6,8.7-62.7,24.6C59,204,48.8,225,46.6,247H32v18h14.6  c2.2,22,12.4,43,28.9,58.4c17.1,15.9,39.3,24.7,62.7,24.7c50.8,0,92.1-41.2,92.1-92c0-0.1,0-0.1,0-0.1h0c0-9.9,11.5-21.6,25.7-21.6  s25.7,11.7,25.7,21.6h0c0,0,0,0,0,0.1c0,50.8,41.3,92,92.1,92c23.3,0,45.6-8.7,62.7-24.7c16.5-15.4,26.7-36.5,28.9-58.5H480v-18  H465.4z M373.8,333c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C450.8,298.5,416.3,333,373.8,333z M138.2,333  c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C215.2,298.5,180.7,333,138.2,333z"/>
                  </svg>
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
