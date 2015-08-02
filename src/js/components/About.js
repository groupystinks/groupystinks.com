var {Component, PropTypes} = require('react');
var React = require('react/addons');
var Colors = require('./ColorMe');
var Hr = require('./Hr');
var PureRender = require('./PureRender');
var Radium = require('radium');
var MobileDetect = require('mobile-detect');
var {Link} = require('react-router');


@Radium
@PureRender
class About extends Component {
  render(): any {
    var deviceDetect = new MobileDetect(window.navigator.userAgent);
    var projects = [
      {link: 'https://github.com/groupystinks/skrik-view', img: '', label: 'skrikView'},
      {link: 'https://github.com/groupystinks/text-rhythm', img: '', label: 'textRhythm'},
      {link: 'https://github.com/groupystinks/groupystinks.com', img: '', label: 'internetOfMine'},
    ];

    var socials = [
      {link: 'https://github.com/groupystinks', label: 'github'},
      {link: 'https://twitter.com/groupystinks', label: 'twitter'},
    ]

    return (
      <div style={styles.root}>
        <div style={styles.profileContainer.profile}>
          <section style={styles.profileContainer.upperChild}>
            <h2 style={styles.profileContainer.name}>
              Lai
              <svg
                width={!deviceDetect.phone() ? '128px': '64px'}
                height={!deviceDetect.phone() ? '128px': '64px'}
                fill="currentcolor" version="1.1" viewBox="0 0 512 512"
                xmlns="http://www.w3.org/svg/2000">
                <path d="M465.4,247c-2.2-22-12.4-43-28.9-58.4c-17.1-15.9-39.3-24.7-62.7-24.7c-41.5,0-77.3,27.4-88.5,67c-7-7-18.5-11.7-29.3-11.7  c-10.8,0-22.3,4.7-29.3,11.7c-11.2-39.6-47-67-88.5-67c-23.3,0-45.6,8.7-62.7,24.6C59,204,48.8,225,46.6,247H32v18h14.6  c2.2,22,12.4,43,28.9,58.4c17.1,15.9,39.3,24.7,62.7,24.7c50.8,0,92.1-41.2,92.1-92c0-0.1,0-0.1,0-0.1h0c0-9.9,11.5-21.6,25.7-21.6  s25.7,11.7,25.7,21.6h0c0,0,0,0,0,0.1c0,50.8,41.3,92,92.1,92c23.3,0,45.6-8.7,62.7-24.7c16.5-15.4,26.7-36.5,28.9-58.5H480v-18  H465.4z M373.8,333c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C450.8,298.5,416.3,333,373.8,333z M138.2,333  c-42.5,0-77-34.6-77-77c0-42.5,34.6-77,77-77c42.5,0,77,34.6,77,77C215.2,298.5,180.7,333,138.2,333z"/>
               </svg>
              <br/>
              Chia-Sheng
            </h2>
            {socials.map(social =>
              <a
                key={social.label}
                href={social.link}
                style={styles.profileContainer.social}
              >
                {social.label}
              </a>
            )}
            <Link to="writing" style={styles.profileContainer.social}>
              writing
            </Link>
          </section>
          <section style={styles.profileContainer.lowerChild}>
            <article><p>
            Believer in literature. Music enthusiast.
            Utilize word and code as tools to forge out humane things.
            </p></article>
          </section>
          <Hr/>
        </div>
        <div style={styles.projectContainer}>
          {projects.map(project =>
            <ProjectItem
              key={project.label}
              label={project.label}
              link={project.link}
              image={project.image}
            />
          )}
        </div>
        <div style={styles.profileContainer.emailContainer}>
          <Hr/>
          <section style={styles.profileContainer.lowerChild}>
            <h2>Hello There!</h2>
            <a style={styles.profileContainer.social} href="mailto:jason0911520@gmail.com">jason0911520@gmail.com</a>
          </section>
        </div>
      </div>
    );
  }
}


@Radium
@PureRender
class ProjectItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string,
  }

  render() {
    return (
      <section style={styles.projects.section}>
        <a target="_blank" style={styles.projects.link} href={this.props.link}>
          <div style={styles.projects.label}>{_.startCase(this.props.label)}</div>
          <div></div>
        </a>
      </section>
    );
  }
}

var styles = {
  root: {
    padding: '50px 0',
  },

  profileContainer: {
    profile: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
  },

    glasses: {
      position: 'relative',
      zIndex: 100,
    },

    upperChild: {
      width: '80%',
      margin: 'auto',
      flex: 1,
      zIndex: 100,
      padding: '30px',
    },

    name: {
      color: Colors.black,
      fontSize: '8vw',
      letterSpacing: '.1em',
      margin: '0 0',
    },

    lowerChild: {
      width: '80%',
      margin: 'auto',
      flex: 1,
      zIndex: 100,
      padding: '30px',
      color: Colors.black,
      fontSize: '24px',
      letterSpacing: '.05em',
    },

    social: {
      color: Colors.gray3,
      padding: '8px',
      fontSize: '20px',
      textDecoration: 'none',

      ':hover': {
        textDecoration: 'underline',
      }
    },

    emailContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    }
  },

  projectContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexFlow: 'row wrap',
    padding: '0 30px 30px 30px',
  },

  projects: {
    section: {
      display: 'flex',
      width: '300px',
      height: '200px',
      zIndex: 100,
      padding: '10px',
      marginTop: "10px",
      color: Colors.black,
      fontSize: '24px',
      letterSpacing: '.05em',
    },

    link: {
      display: 'flex',
      color: Colors.black,
      textDecoration: 'none',
      width: "100%",
      padding: '10px',
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

    label: {
      margin: 'auto',
    }
  }
}

module.exports = About;
