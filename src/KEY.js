// Gracefully borrowed from https://github.com/SeleniumHQ/selenium/blob/2e913973d5171a9aa3c7697733c521bcae5fff4c/javascript/node/selenium-webdriver/lib/input.js
/* eslint-disable key-spacing */

/**
 * A constant used by {@link Actions} and {@link Element}
 * which defines all special keys usable with
 * {@link Element#sendKeys} and `keyUp`/`keyDown`
 *
 * Look at this file's source to see all possible values
 *
 * @constant
 *
 */
var KEY = exports = module.exports = { // eslint-disable-line no-unused-vars
  NULL:         '\uE000',
  CANCEL:       '\uE001',  // ^break
  HELP:         '\uE002',
  BACK_SPACE:   '\uE003',
  TAB:          '\uE004',
  CLEAR:        '\uE005',
  RETURN:       '\uE006',
  ENTER:        '\uE007',
  SHIFT:        '\uE008',
  CONTROL:      '\uE009',
  ALT:          '\uE00A',
  PAUSE:        '\uE00B',
  ESCAPE:       '\uE00C',
  SPACE:        '\uE00D',
  PAGE_UP:      '\uE00E',
  PAGE_DOWN:    '\uE00F',
  END:          '\uE010',
  HOME:         '\uE011',
  ARROW_LEFT:   '\uE012',
  LEFT:         '\uE012',
  ARROW_UP:     '\uE013',
  UP:           '\uE013',
  ARROW_RIGHT:  '\uE014',
  RIGHT:        '\uE014',
  ARROW_DOWN:   '\uE015',
  DOWN:         '\uE015',
  INSERT:       '\uE016',
  DELETE:       '\uE017',
  SEMICOLON:    '\uE018',
  EQUALS:       '\uE019',

  NUMPAD0:      '\uE01A',  // number pad keys
  NUMPAD1:      '\uE01B',
  NUMPAD2:      '\uE01C',
  NUMPAD3:      '\uE01D',
  NUMPAD4:      '\uE01E',
  NUMPAD5:      '\uE01F',
  NUMPAD6:      '\uE020',
  NUMPAD7:      '\uE021',
  NUMPAD8:      '\uE022',
  NUMPAD9:      '\uE023',
  MULTIPLY:     '\uE024',
  ADD:          '\uE025',
  SEPARATOR:    '\uE026',
  SUBTRACT:     '\uE027',
  DECIMAL:      '\uE028',
  DIVIDE:       '\uE029',

  F1:           '\uE031',  // function keys
  F2:           '\uE032',
  F3:           '\uE033',
  F4:           '\uE034',
  F5:           '\uE035',
  F6:           '\uE036',
  F7:           '\uE037',
  F8:           '\uE038',
  F9:           '\uE039',
  F10:          '\uE03A',
  F11:          '\uE03B',
  F12:          '\uE03C',

  COMMAND:      '\uE03D',  // Apple command key
  META:         '\uE03D',  // alias for Windows key

  /**
   * Japanese modifier key for switching between full- and half-width
   * characters.
   * @see <https://en.wikipedia.org/wiki/Language_input_keys>
   */
  ZENKAKU_HANKAKU: '\uE040'
}
/* eslint-enable key-spacing */
