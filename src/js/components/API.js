var ClientID = require('./ClientID');
var RSVP = require('rsvp');
var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();


RSVP.on('error', function(error) {
  console.error(error, error.stack);
});

var APIIsCalling = {};

function _dumbResolvePendingRequests() {
  return RSVP.Promise.resolve();
}

function wrap(
  getPromise: () => Promise
): Promise {
  var id = ClientID.get();
  APIIsCalling[id] = true;
  emitter.emit('start', id);

  var promise = _dumbResolvePendingRequests().then(() => {
    return getPromise();
  });

  promise.catch(error => console.error('API Error', error));

  return promise.finally(() => {
    delete APIIsCalling[id];
    emitter.emit('stop', id);
    if (!Object.keys(APIIsCalling).length) {
      emitter.emit('allStopped');
    }
  });
}

function getWritingAPI(): Promise<Array> {
  return new RSVP.Promise((resolve, reject) => {
    var dataUrl = 'https://api.github.com/repos/groupystinks/skrik-view/contents/data';
    var urlOptions = {
      url: dataUrl,
      crossDomain: true,
      type: 'GET',
    };

    $.ajax(urlOptions).done(threadObject => {
      resolve(threadObject);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.error(errorThrown);
    });
  });
}

function subscribe(
  eventName: string,
  callback: (value: ?boolean) => void
): {remove: () => void;} {
  emitter.on(eventName, callback);
  return {
    remove() {
      emitter.removeListener(eventName, callback);
    }
  };
}

module.exports = {
  wrap,
  getWritingAPI,
  subscribe,
}
