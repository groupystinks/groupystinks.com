function run() {
  var React = require('react');
  var router = require('./router');
  router.run((Root, state) => {
    React.render(<Root path={state.path} />, document.body);
  });
}

run();
