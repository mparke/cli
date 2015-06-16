(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./observable"));

var CLI = (function (Observable) {
  function CLI(options) {
    _classCallCheck(this, CLI);

    _get(Object.getPrototypeOf(CLI.prototype), "constructor", this).call(this);

    this._keyMap = {
      48: "0",
      49: "1",
      50: "2",
      51: "3",
      52: "4",
      53: "5",
      54: "6",
      55: "7",
      56: "8",
      57: "9",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      65: "a",
      66: "b",
      67: "c",
      68: "d",
      69: "e",
      70: "f",
      71: "g",
      72: "h",
      73: "i",
      74: "j",
      75: "k",
      76: "l",
      77: "m",
      78: "n",
      79: "o",
      80: "p",
      81: "q",
      82: "r",
      83: "s",
      84: "t",
      85: "u",
      86: "v",
      87: "w",
      88: "x",
      89: "y",
      90: "z",
      32: " " // space
    };

    this._timeoutId = null;
    this._el = this._createEl();
    this._outputEl = this._createOutputEl();
    this._inputContainerEl = this._createInputContainerEl();
    this._inputEl = this._createInputEl();
    this._cursorEl = this._createCursorEl();
    this._render();

    document.body.addEventListener("keyup", this._onKeyup.bind(this));
    document.body.addEventListener("keydown", this._onKeydown.bind(this));
  }

  _inherits(CLI, Observable);

  _prototypeProperties(CLI, null, {
    _createEl: {
      value: function _createEl() {
        var el = document.createElement("div");
        el.classList.add("cli");
        return el;
      },
      writable: true,
      configurable: true
    },
    _createOutputEl: {
      value: function _createOutputEl() {
        var outputEl = document.createElement("div");
        outputEl.classList.add("output-container");
        return outputEl;
      },
      writable: true,
      configurable: true
    },
    _createInputContainerEl: {
      value: function _createInputContainerEl() {
        var inputContainerEl = document.createElement("div");
        inputContainerEl.classList.add("input-container");
        return inputContainerEl;
      },
      writable: true,
      configurable: true
    },
    _createInputEl: {
      value: function _createInputEl() {
        var inputEl = document.createElement("div");
        inputEl.classList.add("input");
        return inputEl;
      },
      writable: true,
      configurable: true
    },
    _createCursorEl: {
      value: function _createCursorEl() {
        var cursorEl = document.createElement("div");
        cursorEl.classList.add("cursor");
        return cursorEl;
      },
      writable: true,
      configurable: true
    },
    _render: {
      value: function _render() {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._outputEl);
        this._inputContainerEl.appendChild(this._inputEl);
        this._inputContainerEl.appendChild(this._cursorEl);
        fragment.appendChild(this._inputContainerEl);
        this._el.appendChild(fragment);
      },
      writable: true,
      configurable: true
    },
    _onKeyup: {
      value: function _onKeyup(e) {
        e.preventDefault();
      },
      writable: true,
      configurable: true
    },
    _onKeydown: {
      value: function _onKeydown(e) {
        e.preventDefault();
        e.stopPropagation();

        var keyCode = e.which;
        var input = this.getInput();
        if (keyCode === 13) {
          this.clearInput();
          this.trigger("enter", input);
        } else if (keyCode === 8) {
          this.removeInput();
          this.trigger("delete", input);
        } else if (this.hasChar(keyCode)) {
          this.addInput(this.getChar(keyCode));
        }
      },
      writable: true,
      configurable: true
    },
    _createText: {
      value: function _createText(text) {
        var textNode = document.createTextNode(text);
        var p = document.createElement("p");
        p.appendChild(textNode);
        return p;
      },
      writable: true,
      configurable: true
    },
    getEl: {
      value: function getEl() {
        return this._el;
      },
      writable: true,
      configurable: true
    },
    hasChar: {
      value: function hasChar(keyCode) {
        return this._keyMap[keyCode] ? true : false;
      },
      writable: true,
      configurable: true
    },
    getChar: {
      value: function getChar(keyCode) {
        return this._keyMap[keyCode];
      },
      writable: true,
      configurable: true
    },
    addOutput: {
      value: function addOutput(text) {
        if (Array.isArray(text)) {
          text.forEach((function (text_item) {
            this._outputEl.appendChild(this._createText(text_item));
          }).bind(this));
        } else {
          this._outputEl.appendChild(this._createText(text));
        }

        this._outputEl.scrollTop = this._outputEl.scrollHeight;
      },
      writable: true,
      configurable: true
    },
    addIndentedOutput: {
      value: function addIndentedOutput(text) {
        var p = this._createText(text);
        p.classList.add("indented");
        this._outputEl.appendChild(p);
      },
      writable: true,
      configurable: true
    },
    clearInput: {
      value: function clearInput() {
        this._inputEl.textContent = "";
      },
      writable: true,
      configurable: true
    },
    addInput: {
      value: function addInput(text) {
        if (this._timeoutId !== null) {
          clearTimeout(this._timeoutId);
          this._timeoutId = null;
        }

        this._inputEl.textContent = this._inputEl.textContent + text;

        this._timeoutId = setTimeout((function () {
          this._timeoutId = null;
        }).bind(this), 200);
      },
      writable: true,
      configurable: true
    },
    getInput: {
      value: function getInput() {
        return this._inputEl.textContent;
      },
      writable: true,
      configurable: true
    },
    removeInput: {

      // removes 1
      value: function removeInput() {
        var text = this._inputEl.textContent;
        if (text.length) {
          this._inputEl.textContent = text.substring(0, text.length - 1);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return CLI;
})(Observable);

window.CLI = CLI;
module.exports = CLI;

},{"./observable":2}],2:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var slice = Array.prototype.slice;

var Observable = (function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this._events = {};
  }

  _prototypeProperties(Observable, null, {
    on: {

      /**
      *  Registers an event callback to be executed by name with thisArg context
      *  @param {string} name: the event name
      *  @param {function} callback: the function to execute for event name
      *  @param {object} context: the thisArg to be used in applying the callback
      */
      value: function on(name, callback, context) {
        if (!this._events[name]) {
          this._events[name] = [];
        }

        this._events[name].push({ callback: callback, context: context || window });
      },
      writable: true,
      configurable: true
    },
    off: {

      /**
      *  Removes all events at name
      *  @param {string} name: the event name
      */
      value: function off(name, callback) {
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
      },
      writable: true,
      configurable: true
    },
    trigger: {

      /**
      *  Trigger the execution of callbacks associated with the given event name
      *  @param {string} name: the event name
      *  @param {...*} any number of additional arguments to be passed to all event callbacks
      */
      value: function trigger() {
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
      },
      writable: true,
      configurable: true
    }
  });

  return Observable;
})();

module.exports = Observable;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbXBhcmtlNzgvaXNsYW5kL3JlcG9zL2NsaS9zcmMvanMvY2xpLmpzIiwiL1VzZXJzL21wYXJrZTc4L2lzbGFuZC9yZXBvcy9jbGkvc3JjL2pzL29ic2VydmFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7SUNBTyxVQUFVLDJCQUFNLGNBQWM7O0lBRS9CLEdBQUcsY0FBUyxVQUFVO0FBQ2YsV0FEUCxHQUFHLENBQ0ssT0FBTzswQkFEZixHQUFHOztBQUVMLCtCQUZFLEdBQUcsNkNBRUc7O0FBRVIsUUFBSSxDQUFDLE9BQU8sR0FBRztBQUNiLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxTQUFHLEVBQUUsR0FBRztBQUNSLFNBQUcsRUFBRSxHQUFHO0FBQ1IsU0FBRyxFQUFFLEdBQUc7QUFDUixTQUFHLEVBQUUsR0FBRztBQUNSLFNBQUcsRUFBRSxHQUFHO0FBQ1IsU0FBRyxFQUFFLEdBQUc7QUFDUixRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FBRztBQUNQLFFBQUUsRUFBRSxHQUFHO0FBQ1AsUUFBRSxFQUFFLEdBQUc7QUFDUCxRQUFFLEVBQUUsR0FB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LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi9vYnNlcnZhYmxlJztcblxuY2xhc3MgQ0xJIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fa2V5TWFwID0ge1xuICAgICAgNDg6ICcwJyxcbiAgICAgIDQ5OiAnMScsXG4gICAgICA1MDogJzInLFxuICAgICAgNTE6ICczJyxcbiAgICAgIDUyOiAnNCcsXG4gICAgICA1MzogJzUnLFxuICAgICAgNTQ6ICc2JyxcbiAgICAgIDU1OiAnNycsXG4gICAgICA1NjogJzgnLFxuICAgICAgNTc6ICc5JyxcbiAgICAgIDk2OiAnMCcsXG4gICAgICA5NzogJzEnLFxuICAgICAgOTg6ICcyJyxcbiAgICAgIDk5OiAnMycsXG4gICAgICAxMDA6ICc0JyxcbiAgICAgIDEwMTogJzUnLFxuICAgICAgMTAyOiAnNicsXG4gICAgICAxMDM6ICc3JyxcbiAgICAgIDEwNDogJzgnLFxuICAgICAgMTA1OiAnOScsXG4gICAgICA2NTogJ2EnLFxuICAgICAgNjY6ICdiJyxcbiAgICAgIDY3OiAnYycsXG4gICAgICA2ODogJ2QnLFxuICAgICAgNjk6ICdlJyxcbiAgICAgIDcwOiAnZicsXG4gICAgICA3MTogJ2cnLFxuICAgICAgNzI6ICdoJyxcbiAgICAgIDczOiAnaScsXG4gICAgICA3NDogJ2onLFxuICAgICAgNzU6ICdrJyxcbiAgICAgIDc2OiAnbCcsXG4gICAgICA3NzogJ20nLFxuICAgICAgNzg6ICduJyxcbiAgICAgIDc5OiAnbycsXG4gICAgICA4MDogJ3AnLFxuICAgICAgODE6ICdxJyxcbiAgICAgIDgyOiAncicsXG4gICAgICA4MzogJ3MnLFxuICAgICAgODQ6ICd0JyxcbiAgICAgIDg1OiAndScsXG4gICAgICA4NjogJ3YnLFxuICAgICAgODc6ICd3JyxcbiAgICAgIDg4OiAneCcsXG4gICAgICA4OTogJ3knLFxuICAgICAgOTA6ICd6JyxcbiAgICAgIDMyOiAnICcgLy8gc3BhY2VcbiAgICB9XG5cbiAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuICAgIHRoaXMuX2VsID0gdGhpcy5fY3JlYXRlRWwoKTtcbiAgICB0aGlzLl9vdXRwdXRFbCA9IHRoaXMuX2NyZWF0ZU91dHB1dEVsKCk7XG4gICAgdGhpcy5faW5wdXRDb250YWluZXJFbCA9IHRoaXMuX2NyZWF0ZUlucHV0Q29udGFpbmVyRWwoKTtcbiAgICB0aGlzLl9pbnB1dEVsID0gdGhpcy5fY3JlYXRlSW5wdXRFbCgpO1xuICAgIHRoaXMuX2N1cnNvckVsID0gdGhpcy5fY3JlYXRlQ3Vyc29yRWwoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9vbktleXVwLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIF9jcmVhdGVFbCgpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdjbGknKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBfY3JlYXRlT3V0cHV0RWwoKSB7XG4gICAgbGV0IG91dHB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0cHV0RWwuY2xhc3NMaXN0LmFkZCgnb3V0cHV0LWNvbnRhaW5lcicpO1xuICAgIHJldHVybiBvdXRwdXRFbDtcbiAgfVxuXG4gIF9jcmVhdGVJbnB1dENvbnRhaW5lckVsKCkge1xuICAgIGxldCBpbnB1dENvbnRhaW5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRDb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdpbnB1dC1jb250YWluZXInKTtcbiAgICByZXR1cm4gaW5wdXRDb250YWluZXJFbDtcbiAgfVxuXG4gIF9jcmVhdGVJbnB1dEVsKCkge1xuICAgIGxldCBpbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgIHJldHVybiBpbnB1dEVsO1xuICB9XG5cbiAgX2NyZWF0ZUN1cnNvckVsKCkge1xuICAgIGxldCBjdXJzb3JFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGN1cnNvckVsLmNsYXNzTGlzdC5hZGQoJ2N1cnNvcicpO1xuICAgIHJldHVybiBjdXJzb3JFbDtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX291dHB1dEVsKTtcbiAgICB0aGlzLl9pbnB1dENvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMuX2lucHV0RWwpO1xuICAgIHRoaXMuX2lucHV0Q29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5fY3Vyc29yRWwpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX2lucHV0Q29udGFpbmVyRWwpO1xuICAgIHRoaXMuX2VsLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxuXG4gIF9vbktleXVwKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBfb25LZXlkb3duKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGxldCBrZXlDb2RlID0gZS53aGljaDtcbiAgICBsZXQgaW5wdXQgPSB0aGlzLmdldElucHV0KCk7XG4gICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLmNsZWFySW5wdXQoKTtcbiAgICAgIHRoaXMudHJpZ2dlcignZW50ZXInLCBpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSA4KSB7XG4gICAgICB0aGlzLnJlbW92ZUlucHV0KCk7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2RlbGV0ZScsIGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQ2hhcihrZXlDb2RlKSkge1xuICAgICAgdGhpcy5hZGRJbnB1dCh0aGlzLmdldENoYXIoa2V5Q29kZSkpO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVUZXh0KHRleHQpIHtcbiAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGdldEVsKCkge1xuICAgIHJldHVybiB0aGlzLl9lbDtcbiAgfVxuXG4gIGhhc0NoYXIoa2V5Q29kZSkge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXBba2V5Q29kZV0gPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBnZXRDaGFyKGtleUNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fa2V5TWFwW2tleUNvZGVdO1xuICB9XG5cbiAgYWRkT3V0cHV0KHRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0ZXh0KSkge1xuICAgICAgdGV4dC5mb3JFYWNoKGZ1bmN0aW9uKHRleHRfaXRlbSkge1xuICAgICAgICB0aGlzLl9vdXRwdXRFbC5hcHBlbmRDaGlsZCh0aGlzLl9jcmVhdGVUZXh0KHRleHRfaXRlbSkpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb3V0cHV0RWwuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlVGV4dCh0ZXh0KSk7XG4gICAgfVxuXG4gICAgdGhpcy5fb3V0cHV0RWwuc2Nyb2xsVG9wID0gdGhpcy5fb3V0cHV0RWwuc2Nyb2xsSGVpZ2h0O1xuICB9XG4gIFxuICBhZGRJbmRlbnRlZE91dHB1dCh0ZXh0KSB7XG4gICAgbGV0IHAgPSB0aGlzLl9jcmVhdGVUZXh0KHRleHQpO1xuICAgIHAuY2xhc3NMaXN0LmFkZCgnaW5kZW50ZWQnKTtcbiAgICB0aGlzLl9vdXRwdXRFbC5hcHBlbmRDaGlsZChwKTtcbiAgfVxuXG4gIGNsZWFySW5wdXQoKSB7XG4gICAgdGhpcy5faW5wdXRFbC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG5cbiAgYWRkSW5wdXQodGV4dCkge1xuICAgIGlmICh0aGlzLl90aW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0SWQpO1xuICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9pbnB1dEVsLnRleHRDb250ZW50ID0gdGhpcy5faW5wdXRFbC50ZXh0Q29udGVudCArIHRleHQ7XG5cbiAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcbiAgICB9LmJpbmQodGhpcyksIDIwMCk7XG4gIH1cblxuICBnZXRJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRFbC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIC8vIHJlbW92ZXMgMSBcbiAgcmVtb3ZlSW5wdXQoKSB7XG4gICAgbGV0IHRleHQgPSB0aGlzLl9pbnB1dEVsLnRleHRDb250ZW50O1xuICAgIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5faW5wdXRFbC50ZXh0Q29udGVudCA9IHRleHQuc3Vic3RyaW5nKDAsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5DTEkgPSBDTEk7XG5tb2R1bGUuZXhwb3J0cyA9IENMSTtcbiIsImxldCBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuY2xhc3MgT2JzZXJ2YWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gIH1cblxuICAvKipcbiAgKiAgUmVnaXN0ZXJzIGFuIGV2ZW50IGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGJ5IG5hbWUgd2l0aCB0aGlzQXJnIGNvbnRleHRcbiAgKiAgQHBhcmFtIHtzdHJpbmd9IG5hbWU6IHRoZSBldmVudCBuYW1lXG4gICogIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrOiB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBmb3IgZXZlbnQgbmFtZVxuICAqICBAcGFyYW0ge29iamVjdH0gY29udGV4dDogdGhlIHRoaXNBcmcgdG8gYmUgdXNlZCBpbiBhcHBseWluZyB0aGUgY2FsbGJhY2tcbiAgKi9cbiAgb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzW25hbWVdLnB1c2goeyBjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQgfHwgd2luZG93IH0pO1xuICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgLyoqXG4gICogIFJlbW92ZXMgYWxsIGV2ZW50cyBhdCBuYW1lXG4gICogIEBwYXJhbSB7c3RyaW5nfSBuYW1lOiB0aGUgZXZlbnQgbmFtZVxuICAqL1xuICBvZmYobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc3RvcmVkO1xuICAgIHZhciBsZW5ndGg7XG5cbiAgICBpZiAoIWNhbGxiYWNrICYmICFuYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICghY2FsbGJhY2sgJiYgbmFtZSkge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9uZXctYXJyYXktdnMtc3BsaWNlLXZzLXNsaWNlLzJcbiAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gW107XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjYWxsYmFjayAmJiBuYW1lKSB7XG4gICAgICAvLyByZW1vdmUgdGhlIGZpcnN0IGNhbGxiYWNrIG1hdGNoIGZvdW5kIGJ5IHRoaXMgZXZlbnQgbmFtZVxuICAgICAgaWYgKHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICBzdG9yZWQgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICAgIGxlbmd0aCA9IHN0b3JlZC5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc3RvcmVkW2ldLmNhbGxiYWNrID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgc3RvcmVkLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICogIFRyaWdnZXIgdGhlIGV4ZWN1dGlvbiBvZiBjYWxsYmFja3MgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBldmVudCBuYW1lXG4gICogIEBwYXJhbSB7c3RyaW5nfSBuYW1lOiB0aGUgZXZlbnQgbmFtZVxuICAqICBAcGFyYW0gey4uLip9IGFueSBudW1iZXIgb2YgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGFsbCBldmVudCBjYWxsYmFja3NcbiAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fZXZlbnRzW2FyZ3Muc2hpZnQoKV07XG4gICAgdmFyIGxlbmd0aDtcbiAgICB2YXIgb2JqO1xuXG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JqID0gY2FsbGJhY2tzW2ldO1xuICAgICAgICBvYmouY2FsbGJhY2suYXBwbHkob2JqLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmFibGU7Il19
