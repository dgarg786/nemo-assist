import _ from "lodash";
import { reject, resolve } from "./promiseHandler";
import q from "q";

/**
 * normalizes the locator that can be understood by nemo
 * @param {object} nemo  nemo object
 * @param {object|string} locator  a DOM locator that can be either string with location of nemo-view object in LOCATOR folder eg: 'policy.spinner'<br>
 *                           OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
 *                           OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @returns {*} normalized locator that can be understood by nemo
 */
function normalizedLocator(nemo, locator) {
  if (typeof locator === "object") {
    return locator;
  } else if (typeof locator === "string" && locator.indexOf(":") > -1) {
    return locator;
  } else if (typeof locator === "string") {
    return _.get(nemo, `view.${locator}By`, () => {})();
  }
}

/**
 * Returns a promise function that will wait till the element is present in the DOM and resolves on element getting vanished
 * @param {object} nemo  nemo object
 * @param {object|string} componentLocator a DOM locator that can be either string with location of nemo-view object in LOCATOR folder eg: 'policy.spinner'<br>
 *                           OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}  OR <br>
 *                           OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {number} waitTime waitTime in milliseconds by default it's 20000
 * @returns {Function}
 */
function waitTillVanish({ nemo, elementLocator, waitTime }) {
  waitTime = waitTime || _.get(nemo, "data.waitTime", 20000);
  return function() {
    const locator = normalizedLocator(nemo, elementLocator);
    return nemo.driver.wait(
      function() {
        return nemo.view._finds(locator).then(function(elements) {
          if (elements.length === 0) {
            return true;
          }
          return false;
        });
      },
      waitTime,
      `${elementLocator} wait failed`
    );
  };
}

function waitVisible({ nemo, elementLocator, preCondition, waitTime } = {}) {
  preCondition = !(preCondition === false);
  waitTime = waitTime || _.get(nemo, "data.waitTime", 20000);
  return function() {
    let locator;
    try {
      locator = normalizedLocator(nemo, elementLocator);
    } catch (ex) {
      reject(defer, elementLocator);
    }
    var defer = q.defer();
    if (!preCondition) {
      return resolve(defer)();
    }
    return nemo.view._waitVisible(locator, waitTime);
  };
}

function goToUrl({ nemo, url }) {
  return function() {
    return nemo.driver.get(url);
  };
}

module.exports = {
  normalizedLocator: normalizedLocator,
  waitTillVanish: waitTillVanish,
  waitVisible: waitVisible,
  goToUrl: goToUrl
};
