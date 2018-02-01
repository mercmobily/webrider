
const DO = require('deepobject')

/**
 * A base class that represents a generic browser. All browsers ({@link Chrome},
{@link Firefox}) will inherit from this class
 */
class Browser {
  /**
   * Base class for all browser objects such as {@link Chrome}, {@link Firefox},
   * {@link Safari}, {@link Edge}, and {@link Remote Remote}
   *
   * The main aim of Browser objects is to:
   *
   *  * Run the corresponding webdriver process (e.g. `geckodriver` for Firefox, `chromedriver` for Chrome, etc.).
   *  * Provide a configuration object that will be used when creating a new session with the webdriver
   *
   *  A basic (empty) session configuration object looks like this:
   *
   *        {
   *          capabilities: {
   *            alwaysMatch: {},
   *            firstMatch: []
   *          }
   *        }
   *
   * When connecting straight to a locally launched webdriver process, the main use of the session configuraiton
   * object is the setting of browser-specific information.
   * For example when creating a {@link Chrome} object, the basic configuration looks like this:
   *
   *        {
   *          capabilities: {
   *            alwaysMatch: {
   *              chromeOptions: { w3c: true }
   *            },
   *            firstMatch: []
   *          }
   *        }
   *
   * This will ensure that Chrome will "speak" the w3c protocol.
   *
   * Configuration options are set with the methods {@link Browser#setAlwaysMatchKey},
   * {@link Browser#addFirstMatch}, {@link Browser#setRootKey} and {@link Browser#setSpecificKey}
   *
   */
  constructor () {
    this.sessionParameters = {
      capabilities: {
        alwaysMatch: {},
        firstMatch: []
      }
    }
    // Give it a nice, lowercase name
    this.name = 'browser'
    this.specificKey = null
    this.executable = null
  }

  /**
   * Method to set the `alwaysMatch` property in the browser's capabilities
   *
   * @param {string} path The name of the property to set. It can be a path; if path is has a `.` (e.g.
   *                      `something.other`), the property
   *                      `sessionParameters.capabilities.alwaysMatch.something.other` will be set
   * @param {string} path.browserName The user agent
   * @param {string} path.browserVersion Identifies the version of the user agent
   * @param {string} path.platformName Identifies the operating system of the endpoint node
   * @param {boolean} path.acceptInsecureCerts Indicates whether untrusted and self-signed TLS certificates are implicitly trusted on navigation for the duration of the session
   * @param {string} path.pageLoadStrategy Defines the current session’s page load strategy. It can be `none`, `eager` or `normal`
   * @param {object} path.proxy Defines the current session’s proxy configuration. See the
                     {@link https://w3c.github.io/webdriver/webdriver-spec.html#dfn-proxy-configuration spec's
                     proxy options}
   * @param {boolean} path.setWindowRect Indicates whether the remote end supports all of the commands in Resizing and Positioning Windows
   * @param {object} path.timeouts Describes the timeouts imposed on certain session operations. Can have keys `implicit`, `pageLoad` or `script`
   * @param {string} path.unhandledPromptBehavior Describes the current session’s user prompt handler. It
   *                 can be: `dismiss`, `accept`, `dismiss and notify`, `accept and notify`, `ignore`
   * @param {*} value The value to assign to the property
   * @param {boolean} force It will overwrite keys if already present.
   *
   * @example
   * this.setAlwaysMatchKey('platformName', 'linux')
   * this.setAlwaysMatchKey('timeouts.implicit', 10000)
   */
  setAlwaysMatchKey (path, value, force = false) {
    var alwaysMatch = this.sessionParameters.capabilities.alwaysMatch
    if (force || typeof DO.get(alwaysMatch, path) === 'undefined') {
      DO.set(alwaysMatch, path, value)
    }
    return this
  }

  /**
   * Adds a property to the `firstMatch` array in the browser's capabilities.
   *
   * @param {string} name The name of the property to set
   * @param {*} value The value to assign
   * @param {boolean} force It will overwrite keys if needed
   *
   * @example
   * this.addFirstMatch('browserName', 'chrome')
   * this.addFirstMatch('browserName', 'firefox')
   */
  addFirstMatch (name, value, force = false) {
    if (force || !this.sessionParameters.capabilities.firstMatch.indexOf(name) === -1) {
      this.sessionParameters.capabilities.firstMatch.push({ [name]: value })
    }
    return this
  }

  /**
   * Sets a key (or a path) on the object which will be sent to the webdriver when
   * creating a session
   *
   * @param {string} path The name of the property to set. It can be a path; if path is has a `.` (e.g.
   *                      `something.other`), the property
   *                      `sessionParameters.something.other` will be set
   * @param {*} value The value to assign
   * @param {boolean} force It will overwrite keys if needed
   *
   * @example
   * this.setRootKey('login', 'blah')
   * this.setRootKey('pass', 'blah')
   */
  setRootKey (path, value, force = true) {
    if (force || typeof DO.get(this.sessionParameters, path) === 'undefined') {
      DO.set(this.sessionParameters, path, value)
    }
    return this
  }

  /**
   * Sets a configuration option for the specific browser.
   *
   * @param {string} path The name of the property to set. It can be a path; if path is has a `.` (e.g.
   *                      `something.other`), the property
   *                      `sessionParameters.something.other` will be set
   * @param {*} value The value to assign
   * @param {boolean} force It will overwrite keys if needed
   *
   * @example
   * this.setSpecificKey('FIXME1', 'blah')
   * this.setSpecificKey('FIXME2', 'blah')
   */
  setSpecificKey (path, value, force = true) {
    if (!this.specificKey) {
      throw new Error('setSpecificKey called for a browser that doesn\'t support them')
    }
    if (force || typeof DO.get(this.sessionParameters, this.specificKey + '.' + path) === 'undefined') {
      DO.set(this.sessionParameters, `capabilities.alwaysMatch.${this.specificKey}.${path}`, value)
    }
    return this
  }

  /**
   * Return the current session parameters. This is used by the {@link Driver#newSession} call
   * to get the parameters to be sent over
   *
   * @return {Object} The full session parameters
   *
   */
  getSessionParameters () {
    return this.sessionParameters
  }

  /**
   * Set executable for the browser
   *
   * @param {string} executable The name of the executable to run
   */
  setExecutable (executable) {
    this._executable = executable
  }

  /**
   * Run the actual webdriver's executable, depending on the browser
   *
   * @param {Object} opt Options to configure the webdriver executable
   * @param {number} opt.port The port the webdriver executable will listen to
   * @param {Array} opt.args The arguments to pass to the webdriver executable
   * @param {Object} opt.env The environment to pass to the spawn webdriver
   * @param {string} opt.stdio The default parameter to pass to {@link https://nodejs.org/api/child_process.html#child_process_options_stdio stdio} when spawning new preocess.
   *
   */
  async run (options) {
  }
}
exports = module.exports = Browser
