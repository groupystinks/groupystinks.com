var {Component, PropTypes} = require('react');
var React = require('react/addons');
var Router = require('react-router');
var Colors = require('./ColorMe');
var Radium = require('radium');
var PureRender = require('./PureRender');

var Link = Router.Link;


@PureRender
@Radium
class Header extends Component {

  render() {
    var headers = ['Home', 'About', 'Writing'];
    return (
      <header>
        <nav>
          <ul style={styles.list}>
            {headers.map(item =>
              <NavItem
                isSelected={
                  ((_.last(this.props.path.split('/')) || 'home') === item.toLowerCase())
                }
                key={item}
                label={item}
              />
            )}
          </ul>
        </nav>
      </header>
    );
  }
}


@PureRender
@Radium
class NavItem extends Component {
  render() {
    return (
      <li>
        <Link
          to={'/'+ this.props.label.toLowerCase()}>
          <span
            style={[
              styles.listItem.link,
              this.props.isSelected && styles.listItem.linkSelected
            ]}>
          {this.props.label}
          </span>
        </Link>
      </li>
    )
  }
}

var styles  = {
  list: {
    position: 'relative',
    display: 'flex',
    width: '300px',
    margin: '0 auto',
    zIndex: 100,
    fontSize: '20px',
  },

  listItem: {
    link: {
      flex: 1,
      color: Colors.whiteSmoke,
      display: 'block',
      padding: '24px 16px',
      textDecoration: 'none',
      verticalAlign: 'bottom',

      ':active': {
        padding: '18px 14px 14px 18px',
      },
    },

    linkSelected: {
      color: Colors.oceanBlue.lighten(22),
      cursor: 'default',
      padding: '24px 16px',

      ':active': {
        padding: '18px 14px 14px 18px',
      },
    },
  },
}

module.exports = Header
