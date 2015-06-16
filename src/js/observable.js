let slice = Array.prototype.slice;

class Observable {
  constructor() {
    this._events = {}
  }

  /**
  *  Registers an event callback to be executed by name with thisArg context
  *  @param {string} name: the event name
  *  @param {function} callback: the function to execute for event name
  *  @param {object} context: the thisArg to be used in applying the callback
  */
  on(name, callback, context) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push({ callback: callback, context: context || window });
  }
                                                   
  /**
  *  Removes all events at name
  *  @param {string} name: the event name
  */
  off(name, callback) {
    var stored;
    var length;

    if (!callback && !name) {
      return;
    } else if (!callback && name) {
      if (this._events[name]) {
        // http://jsperf.com/new-array-vs-splice-vs-slice/2
        this._events[name] = [];
      }
    } else if (callback && name) {
      // remove the first callback match found by this event name
      if (this._events[name]) {
        stored = this._events[name];
        length = stored.length;
        for (var i = 0; i < length; i++) {
          if (stored[i].callback === callback) {
            stored.splice(i, 1);
          }
        }
      }
    }
  };

  /**
  *  Trigger the execution of callbacks associated with the given event name
  *  @param {string} name: the event name
  *  @param {...*} any number of additional arguments to be passed to all event callbacks
  */
  trigger() {
    var args = slice.call(arguments);
    var callbacks = this._events[args.shift()];
    var length;
    var obj;

    if (callbacks) {
      length = callbacks.length;
      for (var i = 0; i < length; i++) {
        obj = callbacks[i];
        obj.callback.apply(obj.context, args);
      }
    }
  }
}

module.exports = Observable;