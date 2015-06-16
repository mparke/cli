import Observable from './observable';

class CLI extends Observable {
  constructor(options) {
    super();

    this._keyMap = {
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      96: '0',
      97: '1',
      98: '2',
      99: '3',
      100: '4',
      101: '5',
      102: '6',
      103: '7',
      104: '8',
      105: '9',
      65: 'a',
      66: 'b',
      67: 'c',
      68: 'd',
      69: 'e',
      70: 'f',
      71: 'g',
      72: 'h',
      73: 'i',
      74: 'j',
      75: 'k',
      76: 'l',
      77: 'm',
      78: 'n',
      79: 'o',
      80: 'p',
      81: 'q',
      82: 'r',
      83: 's',
      84: 't',
      85: 'u',
      86: 'v',
      87: 'w',
      88: 'x',
      89: 'y',
      90: 'z',
      32: ' ' // space
    }

    this._timeoutId = null;
    this._el = this._createEl();
    this._outputEl = this._createOutputEl();
    this._inputContainerEl = this._createInputContainerEl();
    this._inputEl = this._createInputEl();
    this._cursorEl = this._createCursorEl();
    this._render();

    document.body.addEventListener('keyup', this._onKeyup.bind(this));
    document.body.addEventListener('keydown', this._onKeydown.bind(this));
  }

  _createEl() {
    let el = document.createElement('div');
    el.classList.add('cli');
    return el;
  }

  _createOutputEl() {
    let outputEl = document.createElement('div');
    outputEl.classList.add('output-container');
    return outputEl;
  }

  _createInputContainerEl() {
    let inputContainerEl = document.createElement('div');
    inputContainerEl.classList.add('input-container');
    return inputContainerEl;
  }

  _createInputEl() {
    let inputEl = document.createElement('div');
    inputEl.classList.add('input');
    return inputEl;
  }

  _createCursorEl() {
    let cursorEl = document.createElement('div');
    cursorEl.classList.add('cursor');
    return cursorEl;
  }

  _render() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(this._outputEl);
    this._inputContainerEl.appendChild(this._inputEl);
    this._inputContainerEl.appendChild(this._cursorEl);
    fragment.appendChild(this._inputContainerEl);
    this._el.appendChild(fragment);
  }

  _onKeyup(e) {
    e.preventDefault();
  }

  _onKeydown(e) {
    e.preventDefault();
    e.stopPropagation();

    let keyCode = e.which;
    let input = this.getInput();
    if (keyCode === 13) {
      this.clearInput();
      this.trigger('enter', input);
    } else if (keyCode === 8) {
      this.removeInput();
      this.trigger('delete', input);
    } else if (this.hasChar(keyCode)) {
      this.addInput(this.getChar(keyCode));
    }
  }

  _createText(text) {
    let textNode = document.createTextNode(text);
    let p = document.createElement('p');
    p.appendChild(textNode);
    return p;
  }

  getEl() {
    return this._el;
  }

  hasChar(keyCode) {
    return this._keyMap[keyCode] ? true : false;
  }

  getChar(keyCode) {
    return this._keyMap[keyCode];
  }

  addOutput(text) {
    if (Array.isArray(text)) {
      text.forEach(function(text_item) {
        this._outputEl.appendChild(this._createText(text_item));
      }.bind(this));
    } else {
      this._outputEl.appendChild(this._createText(text));
    }

    this._outputEl.scrollTop = this._outputEl.scrollHeight;
  }
  
  addIndentedOutput(text) {
    let p = this._createText(text);
    p.classList.add('indented');
    this._outputEl.appendChild(p);
  }

  clearInput() {
    this._inputEl.textContent = '';
  }

  addInput(text) {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    this._inputEl.textContent = this._inputEl.textContent + text;

    this._timeoutId = setTimeout(function() {
      this._timeoutId = null;
    }.bind(this), 200);
  }

  getInput() {
    return this._inputEl.textContent;
  }

  // removes 1 
  removeInput() {
    let text = this._inputEl.textContent;
    if (text.length) {
      this._inputEl.textContent = text.substring(0, text.length - 1);
    }
  }
}

window.CLI = CLI;
module.exports = CLI;
