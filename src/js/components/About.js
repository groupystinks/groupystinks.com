var {Component, PropTypes} = require('react');
var React = require('react/addons');
var Colors = require('./ColorMe');
var Hr = require('./Hr');
var glassesBlackLarge = require('../../images/rounded-black-128.png');
var glassesBlackSmall = require('../../images/rounded-black-64.png');
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
      {link: 'https://github.com/groupystinks/groupystinks.github.io', img: '', label: 'internetOfMine'},
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
              {!deviceDetect.phone() ?
                (<img src={glassesBlackLarge} style={styles.profileContainer.glasses}/>
                ):(<img src={glassesBlackSmall} style={styles.profileContainer.glasses}/>)}
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
            <article><p>我在年青時候也曾經做過許多夢，後來大半忘卻了，但自己也並不以為可惜。 所謂回憶者，雖說可以使人歡欣，有時也不免使人寂寞，使精神的絲縷還牽著己逝的寂寞的時光，又有什麼意味呢，而我偏苦於不能全忘卻，這不能全忘的一部分，到現在便成了《吶喊》的來由。 我有四年多，曾經​​常常，——幾乎是每天，出入於質鋪和藥店裡，年紀可是忘卻了，總之是藥店的櫃檯正和我一樣高，質舖的是比我高一倍，我從一倍高的櫃檯外送上衣服或首飾去，在侮蔑裡接了錢，再到一樣高的櫃檯上給我久病的父親去買藥。 回家之後，又須忙別的事了，因為開方的醫生是最有名的，以此所用的藥引也奇特：冬天的蘆根 ，經霜三年的甘蔗 ，蟋蟀要原對的，結子的平地木 ，……多不是容易辦到的東西。 然而我的父親終於日重一日的亡故了。</p></article>
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
  },

  projectContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexFlow: 'row wrap',
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
    },
  },


}

module.exports = About;
