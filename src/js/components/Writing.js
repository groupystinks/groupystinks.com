var {Component, PropsType} = require('react');
var React = require('react/addons');
var PureRender = require('./PureRender');
var Colors = require('./ColorMe')
var Hr = require('./Hr');
var ClientID = require('./ClientID');
var Hr = require('./Hr');
var API = require('./API');
var Radium = require('radium');
var RSVP = require('rsvp');
var asap = require('asap');


@Radium
@PureRender
class Writing extends Component {

  state = {
    _novelsByName: {},
  }

  componentDidMount() {
    API.wrap(() => {
      API.getWritingAPI().then(listResult => {
        var novelsByName = {};
        listResult.forEach(item => novelsByName[item.name] = item);
        asap(() => this.setState({_novelsByName: novelsByName}));
      });
    });
  }

  render() {
    var novelsByName = this.state._novelsByName;
    return (
      <div style={styles.root}>
        <div style={styles.hrContainer}>
          <h3 style={styles.sectionTag}>Novels</h3>
          <Hr/>
        </div>
        <div style={styles.novelContainer}>
          {Object.keys(novelsByName).length ? (
            _.values(novelsByName).map(novel =>
            <Novels
              key={novel.name}
              name={novel.name}
            />)): null}
        </div>
        <div style={styles.hrContainer}>
          <h3 style={styles.sectionTag}>Blogs</h3>
          <Hr/>
        </div>
      </div>
    );
  }
}


@Radium
@PureRender
class Novels extends Component {
  render() {
    var linkBaseURL = 'http://groupystinks.github.io/skrik-view/#/thread/';
    return (
      <section style={styles.novels.section} >
        <a
          target="_blank"
          style={styles.novels.link}
          href={encodeURI(linkBaseURL + this.props.name)}
        >
          <div style={styles.novels.name}>{this.props.name}</div>
          <div></div>
        </a>
      </section>
    )
  }
}

var styles = {
  root: {
    padding: '50px 0',
  },

  hrContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },

  sectionTag: {
    width: '80%',
    margin: 'auto',
    flex: 1,
    zIndex: 100,
    padding: '30px',
  },

  novelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexFlow: 'row wrap',
  },

  novels: {
    section: {
      display: 'flex',
      width: '300px',
      height: '200px',
      zIndex: 100,
      marginTop: "10px",
      padding: "10px",
      color: Colors.black,
      fontSize: '24px',
      letterSpacing: '.05em',
    },

    link: {
      display: 'flex',
      color: Colors.black,
      padding: '10px',
      textDecoration: 'none',
      width: "100%",
      border: '1px solid ' + Colors.gray2,
      transition: 'border .2s ease-out, box-shadow .2s ease-out',

      ':hover': {
        border: "1px solid " + Colors.oceanBlue.lighten(22),
        boxShadow: '5px 6px 7px 6px ' + Colors.gray2,
      },

      ':active': {
        padding: '10px 10px 20px 20px',
      },
    },

    name: {
      margin: 'auto',
    },
  },
}

module.exports = Writing;
