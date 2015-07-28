
// Proxy calls to router to avoid circular dependencies
// https://github.com/rackt/react-router/blob/master/docs/guides/flux.md#circular-dependencies-in-actions
var router;

module.exports = {
  run(render: (component: any, state: {params: Params}) => void) {
    router.run(render);
  }
};

var Router = require('react-router');
var routes = require('./routes');

router = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});
