var React = require('react');
var {Route, DefaultRoute, Redirect} = require('react-router');
var App = require('./components/App');
var Root = require('./components/Root');
var About = require('./components/About');
var Writing = require('./components/Writing');


var routes = (
  <Route handler={Root} name="root" path="/">
    <DefaultRoute handler={App} name="app" />
    <Route handler={About} name="about" path="/about" />
    <Route handler={Writing} name="writing" path="/writing" />
    <Redirect from="home" to="app" />
  </Route>
);

module.exports = routes;
